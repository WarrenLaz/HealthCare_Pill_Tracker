import requests
from bs4 import BeautifulSoup as bfs

#Read from drugs.com and current Drug list names
indexS = "https://dsld.od.nih.gov/browse-products/by_letter/G/8/100"
f = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DB_repo/DataPrep/DataPrepScript3.py', 'r')
alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
#for each drug path in the file get the html file and read it as a soup object
r = requests.get(indexS)
soup = bfs(r.content,'html5lib')
print(soup.find())

