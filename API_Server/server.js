const express = require("express");
const mongo = require("mongodb");
const app = express();
const uri = process.env.MOGO_KEY;
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./middleware/creds");

const MongoClient = new mongo.MongoClient(uri);
// For parsing application/json
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

//Login
app.use("/Login", require("./routes/login"));
//Registration
app.use("/Reg", require("./routes/reg"));
//Add Patient
app.use("/AddPatient", require("./routes/addpatient"));
//Add Patient
app.use("/DeletePatient", require("./routes/deletepatient"));
//userinfo
app.use("/user", require("./routes/user_"));
//patient info
app.use("/patients", require("./routes/getpatient"));

app.use("/patientLogin", require("./route/patientLogin"));

app.listen(port, () => console.log("Server is running", port));
