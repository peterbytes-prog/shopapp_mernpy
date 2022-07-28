#!/usr/bin/env python

"""
Script to monitor system health state including memory usage and cpu %.
"""

import psutil
import socket
import os
from datetime import datetime
from send_mail import sendEmail as generate_email


def check_cpu():
    #check cpu usage
    val = psutil.cpu_percent(interval=1) #get system-wide CPU utilization as a percentage
    good = True # default to true
    message = None # set none
    if val>80: #if cpu usage is over 80%
        good=False#then cpu health false
        message = "Error - CPU usage is over 80%"
    return (good,message)
def check_disk():
    # Return disk usage statistics
    val = psutil.disk_usage('/') #
    good = True
    message = None
    if (100-val.percent)>80:
        good=False
        message = "Error - Available disk space is less than 20%"
    return (good,message)
def check_memory():
    #inspect statistics about system memory usage
    val = psutil.virtual_memory()
    THRESHOLD = 500 * 1024 * 1024 #500MB
    good = True
    message = None
    if val.available<THRESHOLD: #memory less than 500mb threshold
        good=False
        message = "Error - Available memory is less than 500MB"
    return (good,message)

def check_localhost():
    # tries to resolve system host
    good = True
    message = None
    host_name = socket.gethostname() #localhost
    host_ip = socket.gethostbyname(host_name) #get relative home ip address
    if "127.0.0.1" != host_ip:
        good=False
        message = "Error - localhost cannot be resolved to 127.0.0.1"
    return (good,message)

def main():
    # compute selected system check send email to admin for each failed case
    sender = "ross.gallan.jr@gmail.com"
    recipient ="ross.gallan.jr@gmail.com"
    subject =None
    body = "Please check your system and resolve the issue as soon as possible."
    attachment_path = {}
    errors = []
    subject = check_cpu()[1]
    if subject:
        message = generate_email(subject=subject,body=body,attachments=attachment_path, sender=sender,reciever=recipient)
        errors.append(subject)
    subject = check_disk()[1]
    if subject:
        message = generate_email(subject=subject,body=body,attachments=attachment_path, sender=sender,reciever=recipient)
        errors.append(subject)
    subject = check_memory()[1]
    if subject:
        message = generate_email(subject=subject,body=body,attachments=attachment_path, sender=sender,reciever=recipient)
        errors.append(subject)
    subject = check_localhost()[1]
    if subject:
        message = generate_email(subject=subject,body=body,attachments=attachment_path, sender=sender,reciever=recipient)
        errors.append(subject)
    return errors
if __name__ == '__main__':
    main()
