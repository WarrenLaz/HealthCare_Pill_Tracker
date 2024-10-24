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

        return client["DrugProducts"]["Supplements"]

cluster = ping()

for i in range(1, 8):
    print(i)
    dataset = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DB_repo/DataSetMigration/ProductOverview_'+str(i)+'.csv', 'r')
    data = csv.DictReader(dataset)

    #DO NOT RUN PLEASE

    #cluster.delete_many({})
    count = 1
    for item in data:
        print(i)
        cluster.insert_one({
            "DSL ID" : int(item["DSLD ID"]), 
            "Product Name" : str(item["Product Name"]),
            "Brand Name" : str(item["Brand Name"]),
            "Bar Code" : str(item["Bar Code"]),
            "Net Contents" : str(item["Net Contents"]),
            "Serving Size" : str(item["Serving Size"]),
            "Supplement Form [LanguaL]" : str(item["Supplement Form [LanguaL]"]),
            "Date Entered into DSLD" : str(item["Date Entered into DSLD"]),
            "Market Status" : str(item["Market Status"]),
            "Suggested Use" : str(item["Suggested Use"])
        })

    print("FINISHED")