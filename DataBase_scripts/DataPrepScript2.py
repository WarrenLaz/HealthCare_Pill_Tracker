import requests
from bs4 import BeautifulSoup as bfs

#Read from drugs.com and current Drug list names
indexS = "https://www.drugs.com"
f = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DataBase_scripts/DrugNames.txt', 'r')
pages = ["uses", "warnings", "before-taking", "dosage", "side-effects", "interactions"]
#for each drug path in the file get the html file and read it as a soup object
for path in f:
    path = indexS + str(f.read())
    r = requests.get(path)
    soup = bfs(r.content,'html5lib')

    drugName = soup.find("div", {"class" : "ddc-pronounce-title"}).text
    soup.find_all("p", {"class" : "drug-subtitle"})

    for page in pages:
        r_p = requests.get(path+"#"+str(pages))
        soup_p = bfs(r_p.content, 'html5lib')
