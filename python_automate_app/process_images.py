from PIL import Image
import os, pathlib


def process(img_path):
    """Process Image to 600x400 size and change format to .jpeg


    Parameters:
    img_path(str): img file path

    Return:
    SaveImage(tuple(name,size,format))
    """
    size = (600,400)#recommended dimension
    img = Image.open(img_path).convert("RGB") #open as RGB
    img = img.resize(size)#apply resize
    fl_name = pathlib.Path(img_path).parent/pathlib.Path(str(pathlib.Path(img_path).stem)+".jpeg")
    img.save(fl_name,format="JPEG")#format as jpeg
    return fl_name




if __name__ == '__main__':
    img = input('image Path: ')
    process(img)
