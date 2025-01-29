import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
import re
import threading
import time
load_dotenv()
uri = os.environ.get("MOGO_API")
client = MongoClient(uri, server_api = ServerApi('1'))
directory_path = os.environ.get("directory")
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
                'Net_Contents' : float(re.sub(r'[^\d.]', '', Net.group())),
                'Serving_Size': float(re.sub(r'[^\d.]', '', Serving.group())),
                'Form' : line['Supplement Form [LanguaL]'],
                'Suggested_Use': line['Suggested Use']
                })
    print(f'\033[1;32mDocument {doc_no} Processing FINISHED')
    print(f'\033[1;33mMongo migration: Doc {doc_no} in progress...')
    cluster.insert_many(entries)
    print(f'\033[1;32mMongo migration: Doc {doc_no} FINISHED')
         

if __name__ == "__main__":
    start_time = time.time()
    cluster = ping()
    
    threads = []

    while((ans := input('\033[1mWOULD YOU LIKE TO CLEAR DATABASE [0 NO] [1 YES]:')) not in ['1','0']):
        print('\033[0;31mINVALID ANSWER')
    if(ans):
        print('\033[1;31mDELETING ALL DOCUMENTS...\033[0m')
        cluster.delete_many({})
        print('\033[0;32mFINISHED')

    for i in range(1,8):    
        print(f'\033[1;34mInitializing thread {i}')
        t = threading.Thread(target=Read_Doc, args=(cluster,i,))
        t.start()
        threads.append(t)

    for i in range(len(threads)):
        threads[i].join()
        print(f'\033[0;36mThread {i+1} COMPLETE')
    elapsed_time = time.time() - start_time
    print(f"\033[0;35mProcess elapsed time: {elapsed_time} seconds")