import requests
from bs4 import BeautifulSoup as bfs

# Read in HTML file
Alpha = list("abcdefghijklmnopqrstuvwxyz")
indexS = "https://www.drugs.com/alpha/"
f = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DataBase_scripts/DrugNames.txt', 'w')


#start iteration aa ab ac ad...xz yz zz
for alpha in Alpha:
    for alph in Alpha:

        # append "https://www.drugs.com/alpha/" to [xx] 
        # normal

        link = indexS + str(alpha) + str(alph) + ".html"

        # append "https://www.drugs.com/alpha/" to [xx] to query: pro=1
        # Professional Monographs

        linkpro = indexS + str(alpha) + str(alph) + ".html?pro=1"

        r = requests.get(link)
        r2 = requests.get(linkpro)
        soup = bfs(r.content,'html5lib')
        soup2 = bfs(r2.content,'html5lib')

        # Read all medication names

        for med in soup.find_all('ul', attrs = {'class' : 'ddc-list-column-2'}):
            print(med.a['href'])
            f.write(med.a['href'] + "\n")
        for med in soup2.find_all('ul', attrs={"class" : "ddc-list-column-2"}):
            print(med.a['href'])
            f.write(med.a['href'] + "\n")

print('done')
f.close()
        
        