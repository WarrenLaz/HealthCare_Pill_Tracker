import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()
uri = uri = os.environ.get("MOGO_API")
client = MongoClient(uri, server_api = ServerApi('1'))

def ping():
        try:
            client.admin.command('ping')
            print("You successfully connected!")
        except Exception as e:
            print(e)

        return client["DrugProducts"]["Products"]

cluster = ping()

cluster.delete_many({})
dataset = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/db_rep/DataSetMigration/Products.csv','r')
data = csv.DictReader(dataset)
for item in data:
    print(item)
    cluster.insert_one({
        "Product Name" : str(item["ActiveIngredient"]),
        "Brand Name" : str(item["DrugName"]),
        "Form" : str(item["Form"]),
    })
print("FINISHED")