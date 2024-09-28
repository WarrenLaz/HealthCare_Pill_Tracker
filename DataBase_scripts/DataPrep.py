import requests

APIkey = "doh9wwTT2Jm04tGpAA30EMvaiJwtQMqd3AyWCH6g"
url = "https://api.fda.gov/drug/label.json?search=limit=10"

response = requests.get(url)

r_dict = response.json()
print(r_dict)