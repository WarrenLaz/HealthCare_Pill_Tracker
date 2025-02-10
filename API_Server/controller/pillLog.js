const db = require("./dbcontroller");

const { ObjectId } = require("mongodb");
// 
const Log = (req, res) => {
    //pid mid mdate MedName amount
    const log_ = req.body['log'];
    console.log(log_);
    db.updateData(db.getDB('Patients', 'patient'), 
    {_id : new ObjectId(log_['pid'])}, 
        {
            $inc: { "Prescriptions.$[elem].pills_left": -parseInt(log_['amount'],10)*parseInt(log_['dosage'],10) }
        },
        {
            arrayFilters: [{ "elem._id": new ObjectId(log_['mid'])}]
        }
    ).then(
        data=>{
            console.log(data.modifiedCount)
            res.sendStatus(200)
        })
    
}

module.exports = Log;
