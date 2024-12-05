const db = require('../dbcontroller');
const { ObjectId } = require('mongodb');
const getUser = (req, res) =>{
    console.log(req.body);
    db.getData(db.getDB('Physicians', "Physician"), {
        _id : ObjectId(req.body["id"])
    }).then( data => data[0]).then(
        data => {
            if(!(typeof data === 'undefined')){
            res.send({
                Firstname : data['First_Name'],
                Lastname : data['Last_Name'], 
                Email : data['Email_Address'],
                Phone: data['Phone_Number'],
                Patients : data['Patients']
            })
        }
        else{
            res.send("401");
        }
        }
    )
}

module.exports = getUser;