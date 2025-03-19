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

const deletePatient = (req, res) => {
  const payload = req.body["id"];
  db.deleteData(db.getDB("Patients", "patient"), {
    _id: payload,
  });
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

module.exports = { addPatient, deletePatient, getPatients, updatePatient };
