const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./middleware/creds");
// For parsing application/json
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

//PHYSICIAN WEBAPP 
// ----------------------------------------------
//Login
app.use("/Login", require("./routes/login"));
//Registration
app.use("/Reg", require("./routes/reg"));
//userinfo
app.use("/user", require("./routes/user_"));
//patient info
app.use("/patients", require("./routes/patient"));
//refresh
app.use("/refresh", require("./routes/refresh"));
//PATIENT APP 
// ----------------------------------------------
app.use("/patientLogin", require("./routes/patientLogin"));

app.listen(port, () => console.log("Server is running", port));
