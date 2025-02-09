const db = require("./dbcontroller");


// 
const Log = (req, res) => {
    // setLog({ date : new Date(), MedName : MedName_, amount : amount_ });
    const log_ = req.body['log'];
    console.log(log_);
    db.updateData(db.getDB('Patients', 'patient'), 
    {_id : req.body['pid'], "Prescriptions.MedName" : req.body['MedName_']}, 
        {
            $inc : { 'pills_left' : (parseInt(req.body['amount_'])*-1)}
        }
    ).then(data=>console.log(data))
}

module.exports = Log;
