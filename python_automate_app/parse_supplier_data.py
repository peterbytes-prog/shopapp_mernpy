import os, pathlib, csv
from process_images import process
from logger import getLogger

logger = getLogger()


def isPromo(data):
    return float(data.get('Price')) < float(data.get('Prev Price')) #is promo if prev price is higher than current price

def parseCsv(fl):
    csv_dict_lst = [] #will store csv data summary in dictionary
    #try to handle all related exceptions
    try:
        with open(fl,'r') as _csv:
            csv_dict_lst  = list(csv.DictReader(_csv))
            for ind in range(len(csv_dict_lst)):
                images = []# for collecting all images path
                for key in csv_dict_lst[ind]:
                    if key.lower().startswith('image') and key.lower().startswith('image')  and csv_dict_lst[ind][key]:
                        img_path = pathlib.Path(fl.parent)/pathlib.Path(csv_dict_lst[ind][key]) #contruct full image path
                        img_path = process(img_path) #new path of the process image
                        images.append(img_path)
                csv_dict_lst[ind]['images'] = images #store product images
                if isPromo(csv_dict_lst[ind]):
                    csv_dict_lst[ind]['deal'] = {
                        'detail':csv_dict_lst[ind].get('Promo', "Our Seasonal Promotion!"),
                        'price': csv_dict_lst[ind]['Price']
                    } # for deal request see request promo api body
                    csv_dict_lst[ind]['Price'] = csv_dict_lst[ind].get('Prev Price') # set product price as price


    except Exception as err:
        raise err #any error to be handle
    return csv_dict_lst

def parse(data):
    #find and get summary inventory csv
    summary_csv = list(filter(lambda fl: 'inventory.csv' in str(fl), data))
    parse_data = [] #store data summary as dic list
    if summary_csv:
        summary_csv = summary_csv[0] # use the first inventory file as main inventory summary
        parse_data = parseCsv(summary_csv) #parse and process data and image
    else:
        # raise ValueError("No Summary Csv")
        logger.critical("No Summary Csv")
    return parse_data
