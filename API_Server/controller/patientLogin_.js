const db = require("./dbcontroller");
const sha256 = require("../encryptor/sha256");
const jwt = require("jsonwebtoken");

const patientLogin = (req, res) => {
  console.log(req.body);
  const payload = req.body["LoginForm"];
  db.getData(db.getDB("Patients", "patient"), {
    Email_Address: payload["Username"],
  })
    .then((data) => data[0])
    .then((data) => {
      if (typeof data === "undefined") {
        return res.send({ status: "Invalid Email", packet: "" });
      } else {
        const pass = sha256(payload["Password"]);
        //const pass = payload["Password"];
        if (data["Password"] === pass) {
          const accessToken = jwt.sign(
            { user: data["_id"], role: "patient" },
            process.env.ATS,
            { expiresIn: "30s" }
          );

          const refreshToken = jwt.sign(
            { user: data["_id"], role: "patient" },
            process.env.RTS,
            { expiresIn: "1d" }
          );

          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 864 * 100 * 100,
          });

          return res.send({
            status: "200 OK",
            packet: {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          });
        } else {
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
