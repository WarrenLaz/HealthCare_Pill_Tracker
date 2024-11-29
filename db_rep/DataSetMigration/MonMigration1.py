import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
import spacy

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

def ConvertForm(form):
    form_abbreviation_map = {
        'TAB': 'Tablet',
        'CAP': 'Capsule',
        'ER': 'Extended Release',
        'CR': 'Controlled Release',
        'SR': 'Sustained Release',
        'DR': 'Delayed Release',
        'ODT': 'Orally Disintegrating Tablet',
        'CHEW': 'Chewable',
        'SOL': 'Solution',
        'SUSP': 'Suspension',
        'ELIX': 'Elixir',
        'SYR': 'Syrup',
        'LOZ': 'Lozenge',
        'POW': 'Powder',
        'IM': 'Intramuscular',
        'IV': 'Intravenous',
        'SC': 'Subcutaneous',
        'SUBQ': 'SubQ',
        'ID': 'Intradermal',
        'IVP': 'IV Push',
        'IVPB': 'IV Piggyback',
        'CRM': 'Cream',
        'OINT': 'Ointment',
        'LOTION': 'Lotion',
        'PATCH': 'Patch',
        'POWDER': 'Powdered',
        'PASTE': 'Paste',
        'MDI': 'Metered-Dose Inhaler',
        'DPI': 'Dry Powder Inhaler',
        'NEB': 'Nebulizer',
        'INH': 'Inhaler',
        'EYE DROP': 'Eye Drop',
        'EAR DROP': 'Ear Drop',
        'SUPP': 'Suppository',
        'ENEMA': 'Enema',
        'GEL': 'Gel',
        'OVULE': 'Ovule',
        'BUC': 'Buccal',
        'SL': 'Sublingual',
        'PR': 'Per Rectum',
        'PV': 'Per Vagina',
        'TOP': 'Topical',
        'TD': 'Transdermal'
    }

    form_ = nlp(form)
    best = None
    bsim = 0
    for key,value in form_abbreviation_map.items():
        v = nlp(value)
        sim = form_.similarity(v)
        if sim > bsim:
             best = key
             bsim = sim
    return best

cluster.delete_many({})
dataset = open('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/DB_repo/DataSetMigration/Products.csv','r')
data = csv.DictReader(dataset)
for item in data:
    print(item)
    cluster.insert_one({
        "Product Name" : str(item["ActiveIngredient"]),
        "Brand Name" : str(item["DrugName"]),
        "Form" : ConvertForm(item["Form"]),
    })
print("FINISHED")