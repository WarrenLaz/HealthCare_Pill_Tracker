from matplotlib import pyplot as plt
import math
import random as ran

T_a = 2
T_b = 10
runs = 100 
shipping = 20

def Batching(T_a, T_b, Medications_q_f, LowPrescriptions, shipping):
    cost = 0
    for key, meds in Medications_q_f.items():
        quantity = meds[0]
        Left = meds[1]
        amnt_Taken = meds[2]
        days_Left = Left/amnt_Taken
        print(LowPrescriptions)
        if(days_Left <= T_b):
            LowPrescriptions.append(key)
        if(days_Left <= T_a):
            for pres in LowPrescriptions:
                Medications_q_f[pres][1] += quantity
            LowPrescriptions.clear()
            cost += shipping

        meds[1] -= amnt_Taken
    return cost, Medications_q_f, LowPrescriptions
            

def NoBatching(Medications_q_f, T_a, shipping):
    cost = 0
    for key, meds in Medications_q_f.items():
        quantity = meds[0]
        Left = meds[1]
        amnt_Taken = meds[2]
        days_Left = Left/amnt_Taken
        if(days_Left <= T_a):
            meds[1] += quantity
            cost += shipping
        meds[1] -= amnt_Taken
    return cost, Medications_q_f

cost_of_shipping_total = 0
cost_of_shipping_total2 = 0

for i in range(runs):
    Medications = [{}, {}]
    Low_meds = []
    for i in range(ran.randint(0,100)):
        Quantity = ran.randint(50,250)
        Dosage = ran.randint(1,10)
        #batch
        Medications[0][str(i)] = [Quantity,Quantity,Dosage]
        #no batch
        Medications[1][str(i)] = [Quantity,Quantity,Dosage]

        
    
    for i in range(runs):
        Batch = Batching(T_a, T_b, Medications[0], Low_meds, shipping)
        NBatch = NoBatching(Medications[1], T_a, shipping)
        Medications[0] = Batch[1]
        Medications[1] = NBatch[1]
        Low_meds = Batch[2]
        cost_of_shipping_total += Batch[0]
        cost_of_shipping_total2 += NBatch[0]

print(cost_of_shipping_total, cost_of_shipping_total2)
