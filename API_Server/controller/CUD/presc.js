const db = require('../dbcontroller');

const addPrescription = (req, res) =>{
    db.updateData(db.getDB('Patients', "patient"), {
        _id : req.body["id"]
    },{
        $push : {Prescriptions : {
            Note: req.body["Note"],      
            pill_log: req.body["Note"],
        }} 
    })
}

const deletePrescription = (req, res) =>{
    
}

module.exports = getUser;