const db = require('../dbcontroller');

const addPrescription = (req, res) =>{
    db.updateData(db.getDB('Patients', "patient"), {
        _id : req.body["id"]
    },{
        $push : {
            Prescriptions : {
            Note: req.body["Note"],
            Form: req.body["Form"],
            Generic_Name :       
            pill_log: [],
            schedule: [],
        }} 
    })
}

const deletePrescription = (req, res) =>{
    
}

module.exports = getUser;
