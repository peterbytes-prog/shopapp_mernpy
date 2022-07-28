import pymongo
client = None
from datetime import datetime
from logger import getLogger

logger = getLogger()

def connect():
    try:
        client = pymongo.MongoClient('mongodb://127.0.0.1/')
        # client = pymongo.MongoClient('mongodb://mongo:27017/')
        logger.info("successsful connected to database")
    except Exception as conn_err:
        logger.critical("unable to connected to database")
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
