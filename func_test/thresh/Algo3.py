from matplotlib import pyplot as plt
import math
import random as ran
import numpy as np

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


T_a = 2
T_b = 10
runs = 100 
runs2 = 20 
shipping = 20
Shipping_Costs = [[],[]]
average = 0
categories = [i for i in range(runs2)]
for i in range(runs2):
    cost_of_shipping_total = 0
    cost_of_shipping_total2 = 0

    for i in range(runs):
        Medications = [{}, {}]
        Low_meds = []
        for i in range(ran.randint(0,10)):
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
    
    Shipping_Costs[0].append(cost_of_shipping_total)
    Shipping_Costs[1].append(cost_of_shipping_total2)
    average += (cost_of_shipping_total2 - cost_of_shipping_total) /cost_of_shipping_total2

# Apply modern style
plt.style.use('seaborn-v0_8-darkgrid')

x = np.arange(len(categories))  # Label locations
width = 0.4  # Bar width

fig, ax = plt.subplots(figsize=(8, 5))  # Adjust figure size

# Create bars with modern colors
colors = plt.cm.viridis(np.linspace(0.3, 0.7, 2))  # Generates two distinct colors

bars1 = ax.bar(x - width/2, Shipping_Costs[0], width, label='With Batching Algorithm', 
               color=colors[0], alpha=0.8, edgecolor='black', linewidth=1.2)
bars2 = ax.bar(x + width/2, Shipping_Costs[1], width, label='Without Batching Algorithm', 
               color=colors[1], alpha=0.8, edgecolor='black', linewidth=1.2)

# Customize labels and title
ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=12)
ax.set_ylabel("Shipping Cost ($) per 30 Medications", fontsize=13)
ax.set_xlabel("per 100 days", fontsize=13)
ax.set_title("Comparison of Shipping Costs", fontsize=14, fontweight='bold')

# Add gridlines
ax.yaxis.grid(True, linestyle='--', alpha=0.7)

# Calculate and display the average cost per run
runs2 = len(categories)
average_cost = (average / runs2)*100
# Add a styled annotation as a side note
ax.annotate(f'Saves on Average {average_cost:.2f}%\n of the shipment cost!',
            xy=(2.5, max(max(Shipping_Costs)) * 1.05),  # Positioning dynamically
            xycoords='data',
            fontsize=12, fontweight='bold', color='white',
            bbox=dict(facecolor='darkred', alpha=0.8, edgecolor='black', boxstyle='round,pad=0.5'),
            ha='center')
# Add legend
# Add legend and move it to the right
ax.legend(frameon=True, fontsize=12, loc='upper left', bbox_to_anchor=(0.75, 1))


# Show plot
plt.show()

