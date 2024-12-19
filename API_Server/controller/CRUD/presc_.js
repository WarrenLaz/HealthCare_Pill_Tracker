const db = require('../dbcontroller');
const { ObjectId } = require("mongodb");

const addPrescription = (req, res) =>{
    try{
        const payload = req.body["prescData"];
        console.log(payload);
        db.updateData(db.getDB('Patients', "patient"), {
            _id : ObjectId(payload["id"])
        },{
            $push : {
                Prescriptions : {
                _id: ObjectId(),
                Name: payload["PrescName"] ,
                Start: "",
                End: "",
                Note: payload["Note"],
                Units: payload["Units"],
                Quantity : payload["Quantity"],
                Dosage: payload["Dosage"],
                pill_log: [],
                schedule: [],
            }
        } 
        }).then(data => {
            console.log(data);
            res.send("Succcessfully Added");
        })
    } catch(e){
        console.log(e);
        res.json(401);
    }
}

const getPresc = (req, res) =>{
    const payload = req.body["user"]
    db.getData(db.getDB('Patients', "Patient"), {
        id_ : payload["id"]
    }).then( data => data[0]).then(
        data => {
            res.send({
                Prescriptions: data['Prescriptions']
            })
        }
    )
}

const deletePres = (req, res) =>{
    
}

const updatePresc = (req, res) =>{
    
}

module.exports = {getPresc,deletePres,updatePresc, addPrescription};
