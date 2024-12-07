const db = require("../dbcontroller");
const { ObjectId } = require("mongodb");

const getUser = (req, res) =>{
    db.getData(db.getDB('Physicians', 'Physician'), { _id : ObjectId(req.user['user']) })
    .then( data => data[0]).then(data=>{
        res.send({
            First_Name : data['First_Name'],
            Last_Name : data['Last_Name'],
            Email_Address : data['Email_Address'],
            Phone_Number : data['Phone_Number'],
            jwtauth : data['jwtauth']
        });
    }
    )
}

module.exports = getUser;