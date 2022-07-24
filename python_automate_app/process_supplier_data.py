from search_email import searchInventory
from extract_supplier_data import extract
from parse_supplier_data import parse as parseData

#get latest Inventory
inventory_paths = searchInventory()
#unzip folders
for inv in inventory_paths:
    contents = extract(inv.get('folder')) #extract zip content and infolist
    data_summary = parseData(contents) #dict list of data
#process image for size and jpeg
#send data to server
#create report
#send email report to inventory sender and admin
#system check create report
#send system check report
