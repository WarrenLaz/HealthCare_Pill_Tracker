import requests
from bs4 import BeautifulSoup as bfs

# Read in HTML file
Alpha = list("abcdefghijklmnopqrstuvwxyz")
indexS = "https://www.drugs.com/alpha/"
f = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DB_repo/DataPrep/DrugNames.txt', 'w')

store = {}

#start iteration aa ab ac ad...xz yz zz
for alpha in Alpha:
    for alph in Alpha:

        # append "https://www.drugs.com/alpha/" to [xx] to query: pro=1
        # Professional Monographs 29890

        linkpro = indexS + str(alpha) + str(alph) + ".html"
        r2 = requests.get(linkpro)
        soup2 = bfs(r2.content,'html5lib')

        # Read all medication names
        for med in soup2.find_all('ul', attrs={"class" : "ddc-list-column-2"}):
            if str(med.text) in store.keys():
                continue
            else:
                store[str(med.text)] = 1
                print(med.text)
                f.write(med.text + "\n")
print('done')
f.close()
        
        