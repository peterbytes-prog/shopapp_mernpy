import pymongo
client = None
from datetime import datetime

def connect():
    try:
        client = pymongo.MongoClient('mongodb://127.0.0.1/')
    except Exception as conn_err:
        raise conn_err
    db = client['shop'] #use same database as Node App
    return db

def Inventory(data={}):
    model = {
        'time': datetime.now(),
        'from': "",
        'subject':"",
        'file_name':"",
        'processed': False
    }
    model.update(data)
    return model

models = {
    'inventories': Inventory
}
