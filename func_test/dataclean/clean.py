
import spacy
import re
nlp = spacy.load('en_core_web_md')

def ConvertForm(form):
    form_abbreviation_map = {
        'TAB': 'Tablet',
        'CAP': 'Capsule',
        'ER': 'Extended Release',
        'CR': 'Controlled Release',
        'SR': 'Sustained Release',
        'DR': 'Delayed Release',
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
    for key, value in form_abbreviation_map.items():
        v = nlp(value)
        sim = form_.similarity(v)
        if sim > bsim:
             best = key
             bsim = sim
    return best

def ConvertDosage(dosage):
    num = [int(word) for word in dosage.split() if word.isdigit()]
    return num[0]


testa = 'Tablet or Pill'
testb ='liquid'
testc = 'Softgel Capsule'
testd = '4 Tablet(s)'
print(ConvertForm(testa),ConvertForm(testb),ConvertForm(testc))
print(ConvertDosage(testd))
pattern = "\s?\[.*?\]"
print(re.sub(pattern, "", "item [asdfadsfasfasdfadsfas]"))
