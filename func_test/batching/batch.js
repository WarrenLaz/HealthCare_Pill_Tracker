
var batches =      [20, 30, 60, 80, 10];
var currentQuant = [[20, 0], [30, 0], [60, 0], [80, 0], [10,0]];
const perDay =     [1,   2,  3,   4, 1];
const Thresh_a = 5;
const Thresh_b = 10;
const Testval = 200;

var reorder = false;

const Batching = (req, res = {data: {Medications: [], LowPrescriptions: []} }) => {


        meds[1] -= amnt_Taken
    return cost, Medications_q_f, LowPrescriptions*/
    /*def Batching(T_a, T_b, Medications_q_f, LowPrescriptions, shipping):
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
    return cost, Medications_q_f, LowPrescriptions*/


    //Get the pills_left 
    //the frequency* dosage
    //daysleft = pills_left/(frequency*dosage)
    //End_date = Current_Date + daysleft
    //if(daysleft < thresh_1)
    //  add lowbatch
    

}

console.log(Batching(1))