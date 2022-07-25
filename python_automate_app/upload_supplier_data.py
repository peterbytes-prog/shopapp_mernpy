from supplier_image_upload import upload as uploadImage
from supplier_detail_upload import upload as uploadDetail
from supplier_deal_upload import upload as uploadDeal


def upload(data):
    """
    data: dictionary
    """
    images = [] #images path
    to_send = {} #request body
    responses = {}
    for image in data.get('images'):
        try:
            responses['images'] = responses.get('images',[])
            img_resp  = uploadImage(image)
            responses['images'].append(img_resp)
            images.append({'path': img_resp.get('path')}) #upload each product image cache path for data upload
        except Exception as err:
            raise err
    if len(images):
        to_send['images'] = images
    for key in ('description', "department", "name", "price", "unit"): #require request body
        _key = key.title()
        if data.get(_key) or data.get(_key+"s") or data.get(_key+"es"):  #handle plurals
            to_send[key] = data.get(_key) or data.get(_key+"s") or data.get(_key+"es")
    product_resp = uploadDetail(data=to_send)
    product_resp['quantity'] = data.get('Quantity',0)
    responses['product'] = product_resp
    if data.get('deal'):
        deal_data = {**data.get('deal'), "productId":product_resp['product']["_id"]}
        deal_resp = uploadDeal(deal_data)
        deal_resp['quantity'] = data.get('Quantity',0)
        responses['deal'] = deal_resp
    return responses
