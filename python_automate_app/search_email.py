import email, os, secrets
from pathlib import Path
import getpass, imaplib, json
import pymongo
from db import connect, models
from logger import getLogger


logger = getLogger()
db_collection = connect()['inventories']


creds = {'email':"", "password":""}
with open('email_auth.json', 'r') as auth:
    creds = json.load(auth)



def searchInventory(subject='Inventory'):
    summary = []
    try:
        M = imaplib.IMAP4_SSL('imap.gmail.com')
        M.login(creds['email'], creds['password'])

    except Exception as err:
        raise err
        return
    M.select('Inbox')
    status, data = M.search(None, '(Subject Inventory)')
    for num in data[0].split():
        try:
            status, data = M.fetch(num, '(RFC822)')
            for res in data:
                model_data = {}
                ref_summary = {}
                if isinstance(res, tuple):
                    msg = email.message_from_bytes(res[1])
                    ref_summary['From'] = msg["From"]
                    ref_summary['To'] = msg["To"]
                    ref_summary['Subject'] = msg["Subject"]
                    ref_summary['Date'] = msg["Date"]
                    model_data['from'] = msg["From"]
                    model_data['subject'] = msg["Subject"]
                    model_data['time'] = msg["Date"]

                    #check if we've processed this email already
                    mdl_instance = db_collection.find_one(model_data)
                    if mdl_instance:
                        continue
                    if msg.is_multipart():
                        for part in msg.walk():
                            content_type = part.get_content_type()
                            content_disposition = part.get("Content-Disposition") or []
                            if content_type == 'text/plain' and "attachment" not in content_disposition:
                                try:
                                    body = part.get_payload(decode=True).decode()
                                    # print(body)
                                except:
                                    pass
                            elif 'attachment' in content_disposition:
                                filename = part.get_filename() if part.get_filename().isalnum() else f"temp_{secrets.token_urlsafe(8)}"
                                filename += "."+content_type.split('/')[1]
                                if filename:
                                    folder_name = Path("".join(c if c.isalnum() else "_" for c in msg["Subject"]))
                                    if not Path.is_dir(folder_name):
                                        os.mkdir(folder_name)
                                    filepath = Path(folder_name,filename)
                                    ref_summary['folder'] = str(filepath)
                                    model_data['file_name'] = str(filepath)
                                    with open(filepath, "wb") as fl:
                                        fl.write(part.get_payload(decode=True))
                    else:
                        content_type = msg.get_content_type()
                        body = msg.get_payload(decode=True)
                        # if content_type == 'text/plain':
                        #     print(body.decode())
                        pass
                    if content_type == "text/html":
                        folder_name = Path("".join(c if c.isalnum() else "_" for c in msg["Subject"]))
                        if not Path.is_dir(folder_name):
                            os.mkdir(folder_name)
                        filepath = Path(folder_name,"index.html")
                        with open(filepath, "wb") as fl:
                            fl.write(body.encode())
                    model_data = models['inventories'](model_data) #get model schema
                    new_inv_instance = db_collection.insert_one(model_data) #insert new document
                    summary.append({**ref_summary, 'id':new_inv_instance.inserted_id})

        except Exception as err:
            logger.critical(f"{err}")
            continue
    M.close()
    M.logout()
    return summary
