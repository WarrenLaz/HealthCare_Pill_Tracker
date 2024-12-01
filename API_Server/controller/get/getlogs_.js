const db = require('../dbcontroller');

const getLogs = (req, res) =>{
    db.getData(db.getDB('Prescriptions', "Log"), {
        id_ : req.body["user"]
    }).then( data => data[0]).then(
        data => {
            res.send({
                Timestamp : data['time_stamp'],
                Dosage : data['dosage']
            })
        }
    )
}

module.exports = getLogs;