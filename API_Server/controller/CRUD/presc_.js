const db = require("../dbcontroller");

const { ObjectId } = require("mongodb");

const addPrescription = (req, res) => {
  try {
    const payload = req.body["prescData"];
    console.log(payload);
    var dose = payload["Dosage"];
    var frequency = 0;
    payload["FrequencyDetails"].forEach((element) => {
      console.log(element.pillCount);
      frequency += parseInt(element.pillCount);
    });
    console.log('Q',payload["Quantity"])
    var date_Start = new Date(); // Create a new Date object
    var daysToAdd = Math.floor(parseInt(payload["Quantity"]) / (dose * frequency)); // Calculate days to add
    var date_End = new Date(date_Start); // Clone date_Start
    date_End.setDate(date_End.getDate() + daysToAdd);
    console.log(daysToAdd);
    console.log(date_End);
    db.updateData(
      db.getDB("Patients", "patient"),
      {
        _id: ObjectId(payload["id"]),
      },
      {
        $push: {
          Prescriptions: {
            _id: ObjectId(),
            MedName: payload["MedName"],
            Quantity: payload["Quantity"],
            pills_left: payload["Quantity"],
            Dosage: dose,
            Form: payload["Form"],
            FrequencyDetails: payload["FrequencyDetails"],
            Interval: payload["Interval"],
            StartDate: date_Start.toISOString(),
            EndDate: date_End.toISOString(),
            Note: payload["Note"],
          },
        },
      }
    ).then((data) => {
      console.log(data);
      res.send("Succcessfully Added");
    });
  } catch (e) {
    console.log(e);
    res.json(401);
  }
};

const getPresc = (req, res) => {
  const payload = req.body["user"];
  db.getData(db.getDB("Patients", "Patient"), {
    id_: payload["id"],
  })
    .then((data) => data[0])
    .then((data) => {
      res.send({
        Prescriptions: data["Prescriptions"],
      });
    });
};

const deletePres = (req, res) => {
  const { id } = req.params; // Get prescription ID from URL parameter
  if (!id) {
    return res.status(400).json({ error: "Prescription ID is required" });
  }

  db.updateData(
    db.getDB("Patients", "patient"),
    { "Prescriptions._id": ObjectId(id) },
    { $pull: { Prescriptions: { _id: ObjectId(id) } } }
  )
    .then(() => {
      res.send({ message: "Successfully Deleted" });
    })
    .catch((err) => {
      console.error("Error deleting prescription:", err);
      res.status(500).json({ error: "Error deleting prescription" });
    });
};

const updatePresc = (req, res) => {};

module.exports = { getPresc, deletePres, updatePresc, addPrescription };
