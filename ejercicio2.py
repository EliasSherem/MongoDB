from pymongo import MongoClient
from pprint import pprint
from random import randint
client = MongoClient() # Objeto que se comunica con mongod
client = MongoClient('localhost', 27017)



db = client['pymongo_test'] # client.'pymongo_test'
db.posts.drop()
posts = db.posts # posts es un objeto colección

#Inserting documents
post_data = {
    'title': 'Python and MonDB',
    'content': 'PyMongo is fun, you guys!',
    'author': 'Scott'
}



print(post_data.keys())
result = posts.insert_one(post_data)

print('One post: {0}'.format(result.inserted_id))

post_1 = {
    'title': 'Python and MongoDB',
    'content': 'PyMongo is fun, you guys',
    'author': 'Scott'
}
post_2 = {
    'title': 'Virtual Environments',
    'content': 'Use virtual environments, you guys',
    'author': 'Scott'
}
post_3 = {
    'title': 'Learning Python',
    'content': 'Learn Python, it is easy',
    'author': 'Bill'
}
post_4 ={
    'title': 'Learning Java',
    'content': 'Learn Java, it is easy'
}
new_result = posts.insert_many([post_1, post_2, post_3, post_4])
print('Multiple posts: {0}'.format(new_result.inserted_ids))

# Retrieving Documents
bills_post = posts.find_one({'author': 'Bill'})
print(bills_post)
scotts_posts = posts.find({'author': 'Scott'})
print(scotts_posts)
for post in scotts_posts:
    print(post)
