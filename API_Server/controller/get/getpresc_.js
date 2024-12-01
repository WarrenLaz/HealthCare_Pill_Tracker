const db = require('../dbcontroller');

const getUser = (req, res) =>{
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

module.exports = getUser;