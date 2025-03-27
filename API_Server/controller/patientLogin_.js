const db = require("./dbcontroller");
const sha256 = require("../encryptor/sha256");

const patientLogin = (req, res) => {
  console.log(req.body);
  const payload = req.body["LoginForm"];

  db.getData(db.getDB("Patients", "patient"), {
    Email_Address: payload["Username"].toLowerCase(),
  })
    .then((data) => data[0])
    .then((data) => {
      if (typeof data === "undefined") {
        return res.send({ status: "Invalid Email", packet: "" });
      } else {
        const pass = sha256(payload["Password"]);

        console.log("Attempting login for:", payload["Username"]);
        console.log("Raw password from form:", payload["Password"]);
        console.log("Hashed incoming password:", pass);
        console.log("Stored password in DB:", data["Password"]);
        console.log("isNew flag:", data["isNew"]);

        if (data["Password"] === pass) {
          console.log("✅ Password matched");
          return res.send({
            status: "200 OK",
            packet: data,
            isNew: data.isNew,
          });
        } else {
          console.log("Password mismatch");
          return res.send({ status: "Invalid Password", packet: "" });
        }
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.send({ status: "Error", packet: "" });
    });

  console.log("Patient Login Attempted");
};

module.exports = patientLogin;
