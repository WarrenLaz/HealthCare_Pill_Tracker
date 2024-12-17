// routes/patientLogin.js
const express = require("express");
const router = express.Router();
const handlereferesh = require("../controller/refresh_");

router.get("/", handlereferesh);

module.exports = router;
