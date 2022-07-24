from search_email import searchInventory
from extract_supplier_data import extract
from parse_supplier_data import parse as parseData
from upload_supplier_data import upload as uploadData
import pymongo
from db import connect


db_collection = connect()['inventories']


#get latest Inventory
inventory_paths = searchInventory()
#unzip folders
for inv in inventory_paths:
    contents = extract(inv.get('folder')) #extract zip content and infolist
    data_summary = parseData(contents) #dict list of data
    for data in data_summary:
        #send data to server
        responses = uploadData(data)
        if responses.get('product'):
            db_collection.update_one({'_id':inv.get('id')},{'$set':{'processed':True}}) #mark inventory document to proccessed

#create report
#send email report to inventory sender and admin
#system check create report
#send system check report
