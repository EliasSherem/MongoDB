#import pymongo
import csv
from pymongo import MongoClient

client = MongoClient('localhost',27017)
db = client["video"]
coleccion = db["movies"]

print(coleccion.find_one())