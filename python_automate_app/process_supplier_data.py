from search_email import searchInventory
from extract_supplier_data import extract

#get latest Inventory
inventory_paths = searchInventory()
#unzip folders

for inv in inventory_paths:
    contents = extract(inv.get('folder'))
#process image for size and jpeg
#send data to server
#create report
#send email report to inventory sender and admin
#system check create report
#send system check report
