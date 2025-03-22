const express = require("express");
const router = express.Router();
const patient_ = require("../controller/CRUD/patient_");

router.delete("/:id", patient_.deletePatient);

module.exports = router;
