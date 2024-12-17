const db = require("../dbcontroller");
const sha256 = require("../../encryptor/sha256");
const generatePassword = require("../../encryptor/passgen");
const { ObjectId } = require("mongodb");

const addPatient = (req, res) => {
  //payload would go into ping([PAYLOAD])
  const payload = req.body["RegForm"];
  console.log(ObjectId(req.user['user']))
  db.getData(db.getDB("Patients", "patient"), {
    $or: [
      { Phone_Number: payload["Phone_Number"] },
      { Email_Address: payload["Email_Address"] },
    ],
  })
    .then((data) => data[0])
    .then((data) => {
      if (!(typeof data === "undefined")) {
        res.send("Patient Already Exists");
      } else {
        const pass = sha256(generatePassword(12));
        db.pushData(db.getDB("Patients", "patient"), {
          First_Name: payload["First_Name"],
          Last_Name: payload["Last_Name"],
          Password: pass,
          Email_Address: payload["Email_Address"],
          Phone_Number: payload["Phone_Number"],
          Physician: ObjectId(req.user['user']),
          Prescriptions: [],
          isNew: 1,
        }).then(d => {
        db.getData(db.getDB("Patients", "patient"), {
          Email_Address: payload["Email_Address"],
        })
          .then((data) => data[0])
          .then((data) => {
            console.log(ObjectId(req.user['user']))
            db.updateData(
              db.getDB("Physicians", "Physician"),
              { _id: ObjectId(req.user['user']) },
              { $push: { Patients: data["_id"] } }
            )
          })
        });
        res.send("Patient Added");
      }
    });
};

const deletePatient = (req, res) => {
  const payload = req.body["id"];
  db.deleteData(db.getDB("Patients", "patient"), {
    _id: payload,
  });
};

const getPatients = (req, res) =>{
  db.getData(db.getDB('Physicians', 'Physician'), { _id : ObjectId(req.user['user'])})
  .then( data => data[0])
  .then( data => {
    const keys = data["Patients"].map(item => ObjectId(item));
    db.getData(db.getDB('Patients', "patient"), {
        _id : {$in : keys}
    }).then(
        data => {
            console.log(data);
            res.send(data);
        }
    )
  }
  )
}

const updatePatient = (req, res) => {
  const payload = req.body;
  const patientId = payload["id"]; // The patient's unique identifier (assumes ObjectId as string)
  const updates = payload["updates"]; // An object containing the fields to be updated

  if (!patientId || !updates) {
    res.status(400).send("Invalid Request: Missing id or updates");
    return;
  }

  db.updateData(
    db.getDB("Patients", "patient"),
    { _id: ObjectId(patientId) }, // Filter to find the patient by ID
    { $set: updates } // Updates to apply
  )
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).send("Patient Not Found");
      } else {
        res.send("Patient Updated Successfully");
      }
    })
    .catch((err) => {
      console.error("Error updating patient:", err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = { addPatient, deletePatient, getPatients, updatePatient};
