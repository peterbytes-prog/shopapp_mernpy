import email, os, secrets
from pathlib import Path
import getpass, imaplib, json

creds = {'email':"", "password":""}
with open('email_auth.json', 'r') as auth:
    creds = json.load(auth)

try:
    M = imaplib.IMAP4_SSL('imap.gmail.com')
    M.login(creds['email'], creds['password'])
    M.select('Inbox')
    status, data = M.search(None, '(Subject Inventory)')
    for num in data[0].split():
        status, data = M.fetch(num, '(RFC822)')
        for res in data:
            if isinstance(res, tuple):
                msg = email.message_from_bytes(res[1])
                print(msg["From"])
                print(msg["To"])
                print(msg["Subject"])
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = part.get("Content-Disposition") or []
                        if content_type == 'text/plain' and "attachment" not in content_disposition:
                            try:
                                body = part.get_payload(decode=True).decode()
                                print(body)
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
                                with open(filepath, "wb") as fl:
                                    fl.write(part.get_payload(decode=True))
                else:
                    content_type = msg.get_content_type()
                    body = msg.get_payload(decode=True)
                    if content_type == 'text/plain':
                        print(body.decode())
                if content_type == "text/html":
                    folder_name = Path("".join(c if c.isalnum() else "_" for c in msg["Subject"]))
                    if not Path.is_dir(folder_name):
                        os.mkdir(folder_name)
                    filepath = Path(folder_name,"index.html")
                    with open(filepath, "wb") as fl:
                        fl.write(body.encode())
    M.close()
    M.logout()
except Exception as err:
    print ('Something went wrong...')
    raise err
