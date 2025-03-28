const db = require("./dbcontroller");
const { ObjectId } = require("mongodb");

const Batch = (log_) => {
    db.getData(db.getDB("Patients", "patient"),{ _id: new ObjectId(log_["pid"])}).then(
        patient =>{
          const Thresh_A = 2
          const Thresh_B = 10

          //load in the patient data
          prescription_Data = patient[0].Prescriptions
          console.log(prescription_Data)
          target = ObjectId(log_['mid'])

          //find the target med associated with that medication
          const target_med = prescription_Data.find(item => item._id.toString() === target.toString());
          console.log(target_med.Quantity)
          var frequency = 0

          //for each frequency add it to frequency variable to get daily frequency
          target_med.FrequencyDetails.forEach((element) => {
            console.log(element.pillCount);
            frequency += parseInt(element.pillCount);
          });
          
          //frequency is the dosage*frequency
          daysLeft = Math.floor(parseInt(target_med.pills_left) / (target_med.Dosage * frequency));
          var date_End = new Date(); // Clone date_Start
          date_End.setDate(date_End.getDate() + daysLeft)

          //if daysLeft is below the First Threshould add it to the batch
          if(daysLeft <= Thresh_A){
            db.updateData(db.getDB("Patients" , "patient"), {
              _id: new ObjectId(log_["pid"])},
              { 
                $push: { Batch: ObjectId(log_['mid']) } 
              }
          )
          }
          //if its less than the second threshold add it to send a batch alert (bit gets activated)
          if(daysLeft <= Thresh_B){
            db.updateData(db.getDB("Patients" , "patient"), {
              _id: new ObjectId(log_["pid"])},
              { 
                $set: { Batch_Status: 1 } 
              }
          )
          }
          //update end date
          db.updateData(
            db.getDB("Patients", "patient"),
            { _id: new ObjectId(log_["pid"]) },
            {
              $set: {
                "Prescriptions.$[elem].EndDate":
                date_End.toISOString()
              },
            },
            {
              arrayFilters: [{ "elem._id": new ObjectId(log_["mid"]) }],
            }
          )
        }
      )
}

module.exports = Batch