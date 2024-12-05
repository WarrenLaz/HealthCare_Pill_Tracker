// routes/patientLogin.js
const express = require("express");
const router = express.Router();
const patientLogin = require("../controller/patientLogin_");

router.post("/", patientLogin);

module.exports = router;
