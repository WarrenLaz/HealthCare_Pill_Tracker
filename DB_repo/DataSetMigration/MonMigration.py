import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

dataset = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DB_repo/DataSetMigration/Products.csv', 'r')
data = csv.DictReader(dataset)

#DO NOT RUN PLEASE
uri = "APIKEY"
client = MongoClient(uri, server_api = ServerApi('1'))

def ping():
    try:
        client.admin.command('ping')
        print("You successfully connected!")
    except Exception as e:
        print(e)
    
    return client["DrugProducts"]["Drugs"]

cluster = ping()
#cluster.delete_many({})
count = 1
for item in data:
    print(str(count) + "\t" + str(item))
    cluster.insert_one({
        "ProductNo" : int(item["ProductNo"]), 
        "Form" : str(item["Form"]),
        "Strength" : str(item["Strength"]),
        "ReferenceDrug" : item["ReferenceDrug"],
        "DrugName" : str(item["DrugName"]),
        "ActiveIngredient" : str(item["ActiveIngredient"]),
        "ReferenceStandard" : item["ReferenceStandard"]
    })


    count+=1

print("FINISHED")