const db = require('../dbcontroller');
const sha256 = require('../../encryptor/sha256');
const generatePassword = require('../../encryptor/passgen')
const { ObjectId } = require('mongodb');


const addPatient = (req,res)=> {
    //payload would go into ping([PAYLOAD])
    const payload = req.body['RegForm'];

    db.getData(db.getDB('Patients', 'patient'), {
        "$or": [
            {Phone_Number : payload['Phone_Number']},
            {Email_Address : payload['Email_Address']}
        ]
    }).then(
        data => data[0]
    ).then(
        data => {
            if (!(typeof data === 'undefined')) {
                res.send("Patient Already Exists");
            }
            else{
                const pass = sha256(generatePassword(12));
                console.log(pass);
                console.log('pay', payload);
                db.pushData(db.getDB('Patients', 'patient'), 
                {
                    First_Name: payload['First_Name'],
                    Last_Name: payload['Last_Name'],
                    Password: pass,
                    Email_Address: payload['Email_Address'],
                    Phone_Number: payload['Phone_Number'],
                    Physician: ObjectId(payload['Phy_id']),
                    Prescriptions: [],
                    isNew: 1
                });
                db.getData(db.getDB('Patients', 'patient'),{Email_Address : payload['Email_Address']}).then(
                    data => data[0]
                ).then(
                    data => {
                    console.log(payload['Phy_id']);
                    console.log(data['_id']);
                    db.updateData(db.getDB('Physicians', 'Physician'),
                        {_id: ObjectId(payload['Phy_id'])},
                        {$push: {Patients: data['_id']}}
                    );
                    }
                )
                res.send("200 OK");
            }
    })
}

const deletePatient = (req, res) => {
    const payload = req.body["id"];
    db.deleteData(db.getDB("Patients", "patient"), {
        "_id" : payload
    });
}


module.exports = {addPatient, deletePatient};