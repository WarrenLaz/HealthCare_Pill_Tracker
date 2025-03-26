const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./middleware/creds");
const cookieParser = require("cookie-parser");
const JWTver = require("./middleware/jwtver");
const jwtver_0 = require("./middleware/jwtver_0");

app.use(cookieParser());

// For parsing application/json
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

//PATIENT APP
// ----------------------------------------------
app.use("/patientLogin", require("./routes/patientLogin"));

//PHYSICIAN WEBAPP
// ----------------------------------------------
//Login
app.use("/Login", require("./routes/login"));
//Registration
app.use("/Reg", require("./routes/reg"));
//refresh
app.use("/refresh", require("./routes/refresh"));
//refresh
app.use("/logout", require("./routes/logout"));

//This middlewear just verifies the JWT Token, it doesn't change the payload.
//app.use(jwtver_0);
//logs
app.use("/logs", require("./routes/logs"));

//Prescription Info
app.use("/prescription", require("./routes/prescription_"));
app.use("/prescription", require("./routes/deletepresc"));

app.use("/search", require("./routes/search_"));
//used for verification, cannot sql inject without the jwt cookie.


//This middlewear both verifies the JWT Token, then changes the payload to the JWT Token decryption.
//userinfo
app.use(JWTver);
app.use("/user", require("./routes/user_"));
app.use("/user", require("./routes/updatePhys"));

//patient info
app.use("/patients", require("./routes/patient"));
app.use("/patients", require("./routes/delepat"));
app.use("/patients", require("./routes/editpat"));

app.listen(port, () => console.log("Server is running", port));

