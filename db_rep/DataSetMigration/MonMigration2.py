import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
import spacy
import re

load_dotenv()
uri = uri = os.environ.get("MOGO_API")
client = MongoClient(uri, server_api = ServerApi('1'))
nlp = spacy.load('en_core_web_md')

def ping():
        try:
            client.admin.command('ping')
            print("You successfully connected!")
        except Exception as e:
            print(e)

        return client["DrugProducts"]["Products"]

cluster = ping()

pattern = "\s?\[.*?\]"
cluster.delete_many({})
for i in range(1, 8):
    print(i)
    dataset = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/db_rep/DataSetMigration/ProductOverview_'+str(i)+'.csv', 'r')
    data = csv.DictReader(dataset)

    for item in data:
        print(i)

        cluster.insert_one({
            "Product_Name" : str(item["Product Name"]),
            "Brand_Name" : str(item["Brand Name"]),
            "Form" : str(re.sub(pattern, "", item["Supplement Form [LanguaL]"])),
        })

    print("FINISHED")