const db = require('../dbcontroller');

const getPatient = (req, res) =>{
    db.getData(db.getDB('Patients', "patient"), {
        id_ : req.body["user"]
    }).then( data => data[0]).then(
        data => {
            res.send(                {
                First_Name: data['First_Name'],
                Last_Name: data['Last_Name'],
                Email_Address: data['Email_Address'],
                Phone_Number: data['Phone_Number'],
                Prescriptions: data['Prescriptions'],
                isNew: data['isNew']
            })
        }
    )
}

module.exports = getPatient;