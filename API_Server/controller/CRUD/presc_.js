const db = require('../dbcontroller');

const addPrescription = (req, res) =>{
    db.updateData(db.getDB('Patients', "patient"), {
        _id : req.body["id"]
    },{
        $push : {
            Prescriptions : {
            Product_ID: req.body["Product_ID"] ,
            Start : req.body["Start_Date"],
            End: req.body["End_date"],
            Note: req.body["Note"],
            Form: req.body["Form"],
            Quantity : req.body["Quantity"],
            Daily_Intake : req.body["Daily_Intake"],
            pill_log: [],
            schedule: [],
        }} 
    })
}

const getPresc = (req, res) =>{
    db.getData(db.getDB('Prescriptions', "Prescription"), {
        id_ : req.body["user"]
    }).then( data => data[0]).then(
        data => {
            res.send({
                End_Date : data['End_Date'],
                Start_Date : data['Start_Date'], 
                Email : data['Quantity'],
                Phone: data['Dosage'],
                Patients : data['Product_id'],
            })
        }
    )
}

const deletePres= (req, res) =>{
    
}

const updatePresc = (req, res) =>{
    
}

module.exports = {getPresc,deletePres,updatePresc};
