#
import os, requests, pathlib, json
from PIL import Image

url = "http://localhost:3001/upload/detail"
def upload(data):
    """Serialize content of files into json that'll be send to the server
    Parameters:
    data(object):

    Return:
    data(dict):
    """
    req = requests.post(url, json=data)#create a request and send file
    req.raise_for_status()
    return req.json()

if __name__ == '__main__':
    data = json.loads(input("data as json"))
    upload(data)
