const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./middleware/creds");
const cookieParser = require('cookie-parser');
const JWTver = require("./middleware/jwtver");


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
//supplement
app.use("/supplement", require("./routes/supplement_"));

app.use(JWTver);
//userinfo
app.use("/user", require("./routes/user_"));
//patient info
app.use("/patients", require("./routes/patient"));

app.listen(port, () => console.log("Server is running", port));


