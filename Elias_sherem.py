import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["video"]

query = { 'imdb.rating': None}
col = db["movieDetails"]

# Update database
newvalues = { "$set": { "imdb.rating": "Borrame" } }
new = col.update_many(query, newvalues)
print(new.modified_count, "documents updated.")

myquery = {"imdb": "Borrame"}
newvalues = {"$set": {"id": ""}}

x = col.update_many(myquery, newvalues)

print(x)