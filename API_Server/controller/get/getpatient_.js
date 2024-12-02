const db = require('../dbcontroller');
const { ObjectId } = require('mongodb');
const getPatient = (req, res) =>{
    const keys = req.body["keys"].map(item => ObjectId(item));
    db.getData(db.getDB('Patients', "patient"), {
        _id : {$in : keys}
    }).then(
        data => {
            console.log(data);
            res.send(data);
        }
    )
}

module.exports = getPatient;