const db = require('../dbcontroller');

const { ObjectId } = require("mongodb");


const addPrescription = (req, res) =>{
    try{
        const payload = req.body["prescData"];
        console.log(payload);
        console.log(payload);
        var date_ = new Date();
        var date2_ = new Date( date_.setDate( date_.getDate() + (parseInt(payload["Quantity"]/(dose*frequency)))))
        var dose = payload["Dosage"];
        var frequency = 0
        payload["FrequencyDetails"].forEach(element => {
            console.log(element.pillCount)
            frequency += parseInt(element.pillCount)
        });
        console.log(frequency)
        db.updateData(db.getDB('Patients', "patient"), {
            _id : ObjectId(payload["id"])
        },{
            $push : {
                Prescriptions : {
                    _id: ObjectId(),
                    MedName: payload["MedName"],
                    Quantity: payload["Quantity"],
                    pills_left: payload["Quantity"],
                    Dosage: dose,
                    Form: payload["Form"],
                    FrequencyDetails: payload["FrequencyDetails"],
                    Interval: payload["Interval"],
                    StartDate: date_,
                    EndDate:  date2_,
                    Note: payload["Note"],
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
    db.getData(db.getDB('Patients', 'patient'), req.body.data._id).then( data => {
    })
}

const updatePresc = (req, res) =>{
    
}

module.exports = {getPresc,deletePres,updatePresc, addPrescription};
