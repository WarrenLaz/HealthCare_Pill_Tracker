import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
import re
import threading

load_dotenv()
uri = os.environ.get("MOGO_API")
client = MongoClient(uri, server_api = ServerApi('1'))
directory_path = '/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/db_rep/DataSetMigration'
def ping():
        try:
            client.admin.command('ping')
            print("You successfully connected!")
        except Exception as e:
            print(e)

        return client["DrugProducts"]["Products"]

def Read_Doc(cluster, doc_no):
    try:
        document = csv.DictReader(open(directory_path+f'/ProductOverview_{doc_no}.csv','r'))
    except FileNotFoundError:
        print('\033[0;31mFile Not Found')
        return
    print('\033[0;32mFile Found')
    entries = []
    print(f'\033[1;33mDocument {doc_no} being processed...')
    for line in document:
        Serving = re.search(r'\d+([.,]\d+)?', line['Serving Size'])
        Net = re.search(r'\d+([.,]\d+)?', line['Net Contents'])
        if Serving and Net :
            entries.append(
                {
                'Product_Name': line['Product Name'], 
                'Brand_Name' : line['Brand Name'],
                'Net_Contents' : float(re.sub(r'[^\d.]', '', Serving.group())),
                'Serving_Size': float(re.sub(r'[^\d.]', '', Net.group())),
                'Form' : line['Supplement Form [LanguaL]'],
                'Suggested_Use': line['Suggested Use']
                })
    print(f'\033[1;32mDocument {doc_no} Processing FINISHED')
    print(f'\033[1;33mMongo migration: Doc {doc_no} in progress...')
    cluster.insert_many(entries)
    print(f'\033[1;32mMongo migration: Doc {doc_no} FINISHED')
         

if __name__ == "__main__":
    cluster = ping()
    while((ans := input('\033[1mWOULD YOU LIKE TO CLEAR DATABASE [0 NO] [1 YES]:')) not in ['1','0']):
        print('\033[0;31mINVALID ANSWER')
    if(ans):
        print('\033[1;31mDELETING ALL DOCUMENTS...\033[0m')
        cluster.delete_many({})
        print('\033[0;32mFINISHED')

    print(f'\033[1;34mInitializing thread {1}')
    t1 = threading.Thread(target=Read_Doc, args=(cluster,1,))
    t1.start()
    print(f'\033[1;34mInitializing thread {2}')
    t2 = threading.Thread(target=Read_Doc, args=(cluster,2,))
    t2.start()
    print(f'\033[1;34mInitializing thread {3}')
    t3 = threading.Thread(target=Read_Doc, args=(cluster,3,))
    t3.start()
    print(f'\033[1;34mInitializing thread {4}')
    t4 = threading.Thread(target=Read_Doc, args=(cluster,4,))
    t4.start()
    print(f'\033[1;34mInitializing thread {5}')
    t5 = threading.Thread(target=Read_Doc, args=(cluster,5,))
    t5.start()
    print(f'\033[1;34mInitializing thread {6}')
    t6 = threading.Thread(target=Read_Doc, args=(cluster,6,))
    t6.start()  
    print(f'\033[1;34mInitializing thread {7}')  
    t7 = threading.Thread(target=Read_Doc, args=(cluster,7,))
    t7.start()  
    t1.join()
    print(f'\033[0;36mThread {1} COMPLETE')
    t2.join()
    print(f'\033[0;36mThread {2} COMPLETE')
    t3.join()
    print(f'\033[0;36mThread {3} COMPLETE')
    t4.join()
    print(f'\033[0;36mThread {4} COMPLETE')
    t5.join()
    print(f'\033[0;36mThread {5} COMPLETE')
    t6.join()
    print(f'\033[0;36mThread {6} COMPLETE')
    t7.join()
    print(f'\033[0;36mThread {7} COMPLETE')