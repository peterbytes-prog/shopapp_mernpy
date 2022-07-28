#!/usr/bin/python3
import logging

def getLogger():
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    formatter  = logging.Formatter('%(asctime)s: %(levelname)s: %(message)s')
    file_handler = logging.FileHandler('python_app.log')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger

if __name__ == '__main__':
    getLogger()
