const db = require("../dbcontroller");
const sha256 = require("../../encryptor/sha256");
const generatePassword = require("../../encryptor/passgen");
//converts string IDs to MongoDB Object IDs.
const { ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");

async function sendSecureEmail(Email_Address, Password) {
  console.log("\x1bPASSWORD: \x1b[0m" + Password);
  try {
    // 1️⃣ Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP service (Gmail, Outlook, etc.)
      port: 465, // Port for secure connections (SSL/TLS)
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.Email, // Email address from .env
        pass: process.env.Password, // Email password from .env
      },
    });

    // 2️⃣ Set email options
    const mailOptions = {
      from: process.env.Email, // Sender address
      to: Email_Address, // Recipient(s)
      subject: "Secure Email from ReplenX", // Email subject
      text: Password, // Plain text body
      html: "<p>This is a Password: </p> <strong>" + Password + "</strong>", // HTML email body
    };

    // 3️⃣ Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// add patient
const addPatient = (req, res) => {
  //payload would go into ping([PAYLOAD])
  const payload = req.body["RegForm"];
  console.log(ObjectId(req.user["user"]));
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
        const nonhashpass = generatePassword(12);
        const pass = sha256(nonhashpass);
        sendSecureEmail(payload["Email_Address"], nonhashpass);
        db.pushData(db.getDB("Patients", "patient"), {
          First_Name: payload["First_Name"],
          Last_Name: payload["Last_Name"],
          Password: pass,
          Email_Address: payload["Email_Address"],
          Phone_Number: payload["Phone_Number"],
          Physician: ObjectId(req.user["user"]),
          Prescriptions: [],
          Logs: [],
          isNew: 1,
        }).then((d) => {
          db.getData(db.getDB("Patients", "patient"), {
            Email_Address: payload["Email_Address"],
          })
            .then((data) => data[0])
            .then((data) => {
              console.log(ObjectId(req.user["user"]));
              db.updateData(
                db.getDB("Physicians", "Physician"),
                { _id: ObjectId(req.user["user"]) },
                { $push: { Patients: data["_id"] } }
              );
            });
        });
        res.send("Patient Added");
      }
    });
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params; // Get patient ID from request parameters
    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const patientId = new ObjectId(id);

    await db.getDB("Patients", "patient").deleteOne({ _id: patientId });

    await db.updateData(
      db.getDB("Physicians", "Physician"),
      { Patients: patientId },
      { $pull: { Patients: patientId } }
    );

    res.json({ message: "Patient successfully deleted and reference removed" });
  } catch (err) {
    console.error("Error deleting patient:", err);
    res.status(500).json({ error: "Error deleting patient" });
  }
};

const getPatients = (req, res) => {
  db.getData(db.getDB("Physicians", "Physician"), {
    _id: ObjectId(req.user["user"]),
  })
    .then((data) => data[0])
    .then((data) => {
      const keys = data["Patients"].map((item) => ObjectId(item));
      db.getData(db.getDB("Patients", "patient"), {
        _id: { $in: keys },
      }).then((data) => {
        console.log(data);
        res.send(data);
      });
    });
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Patient ID" });
    }
    const patientId = new ObjectId(id);

    // Prevent updating restricted fields like _id
    delete updates._id;

    // Check if patient exists before updating
    const patient = await db
      .getDB("Patients", "patient")
      .findOne({ _id: patientId });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Perform the update
    const result = await db
      .getDB("Patients", "patient")
      .updateOne({ _id: patientId }, { $set: updates });

    // Check if any changes were made
    if (result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "No changes made to the patient record" });
    }

    res.json({ message: "Patient successfully updated" });
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).json({ error: "An internal error occurred" });
  }
};

module.exports = { addPatient, deletePatient, getPatients, updatePatient };
