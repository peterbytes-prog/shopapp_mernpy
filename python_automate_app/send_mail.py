from smtplib import SMTP, SMTP_SSL
import email, os, secrets, json
from pathlib import Path
import mimetypes


creds = {'email':"", "password":""}
with open('email_auth.json', 'r') as auth:
    creds = json.load(auth)


def sendEmail(sender, reciever, **data):
    try:
        server_ssl = SMTP_SSL('smtp.gmail.com', 465) #connect to mail server encrypted
        server_ssl.ehlo() #initiate communication
        server_ssl.login(creds['email'], creds['password']) #login with user data from json data
    except Exception as smtp_err:
        raise smtp_err # TODO: handle exception
    message = constructEmail(sender, reciever, data)
    try:
        resp = server_ssl.send_message(message)
    except Exception as send_err:
        raise send_err # TODO: handle exception
    return True

def constructEmail(sender, reciever, data):
    """generate email message from data and send email """
    message = email.message.EmailMessage()
    message['From'] = sender
    message['To'] = reciever
    message['Subject'] = data.get('subject', "") #use empty string as subject if no subject in data
    message.set_content(data.get('body'))
    for fl_name in data.get('attachments', {}): #data['attachment'] as dict of file name key and path value
        try:
            with open(Path(data['attachments'][fl_name]), 'rb') as fl_content: #binary data to send
                mime, enc = mimetypes.guess_type(data['attachments'][fl_name]) #('type/subtype', encoding)
                main_type, sub_type = mime.split('/', 1)
                message.add_attachment(fl_content.read(),
                                        maintype=main_type,
                                        subtype = sub_type,
                                        filename = fl_name
                                        )

        except Exception as err: #catch all errors
            raise err
    return message

if __name__ == '__main__':
    #sample data
    sender = 'ross.gallan.jr@gmail.com'
    reciever = 'ross.gallan.jr@gmail.com'
    attachments = {'inventory_update.pdf': f"reports/inventories/2022/07/23/16/56/03/Peter_Alabi__peter_alabi_rocketmail_com_.pdf"}
    subject = body = "Test Inventory Update Report Email"

    sendEmail(sender=sender, reciever=reciever, subject=subject, body=body, attachments=attachments)
