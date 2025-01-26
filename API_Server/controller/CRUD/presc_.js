const db = require('../dbcontroller');
const { ObjectId } = require("mongodb");

const addPrescription = (req, res) =>{
    try{
        const payload = req.body["prescData"];
        console.log(payload);
        console.log(payload);
        db.updateData(db.getDB('Patients', "patient"), {
            _id : ObjectId(payload["id"])
        },{
            $push : {
                Prescriptions : {
                _id: ObjectId(),
                MedName: payload["MedName"],
                Dosage: payload["Dosage"],
                Units: payload["Units"],
                Form: payload["Form"],
                RouteOfAdmin: payload["RouteOfAdmin"],
                FrequencyDetails: payload["FrequencyDetails"],
                Startdate: payload["Startdate"],
                Quantity: payload["Quantity"],
                Note: payload["Note"],
                Schedule: payload["Schedule"]
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
