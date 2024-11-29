const db = require('./dbcontroller');
const sha256 = require('../encryptor/sha256');

const handleReg = (req,res)=> {
    //payload would go into ping([PAYLOAD])
    const payload = req.body['data'];

    db.getData(db.getDB('Physicians', 'Physician'), {
        "$or": [
            {Phone_Number : payload['Practice_Phone_Number']},
            {Email_Address : payload['Practice_Email_Address']}
        ]
    }).then(
        data => data[0]
    ).then(
        data => {
            if (!(typeof data === 'undefined')) {
                res.send("Account Already Exists");
            }
            else{
                const pass = sha256(payload['Password']);
                console.log(pass);
                db.pushData(db.getDB('Physicians', 'Physician'), 
                {
                    First_Name: payload['First_Name'],
                    Last_Name: payload['Last_Name'],
                    Password: pass,
                    Email_Address: payload['Practice_Email_Address'],
                    Phone_Number: payload['Practice_Phone_Number'],
                    Patients: []
                })
                res.send("Account Successfully Created")
            }
    })
}

module.exports = handleReg;