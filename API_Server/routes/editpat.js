const express = require("express");
const router = express.Router();
const patient_ = require("../controller/CRUD/patient_");

router.put("/:id", patient_.updatePatient);

module.exports = router;
