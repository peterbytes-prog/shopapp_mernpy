#!/usr/bin/env python

"""
This Script Uploads images to the running server on localhost
"""
import requests
import os, pathlib

url = "http://localhost:3001/upload/image"

def upload(img_path):
    img_path = pathlib.Path(img_path)
    with open(img_path,'rb') as opened:
        req = requests.post(url,files={"image":opened})#create a request and send file
        req.raise_for_status()#verify sent data
        return req.json()

if __name__ == '__main__':
    p = input('image path: ')
    print(upload(p))
