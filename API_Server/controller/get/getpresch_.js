const db = require('../dbcontroller');

const getUser = (req, res) =>{
    db.getData(db.getDB('Prescription', "Schedule"), {
        id_ : req.body["user"]
    }).then( data => data[0]).then(
        data => {
            res.send({
                Day : data['First_Name'],
                Times : data['Last_Name'], 
                Email : data['Email_Address'],
                Phone: data['Phone_Number'],
                Patients : data['Patients']
            })
        }
    )
}

module.exports = getUser;