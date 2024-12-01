const express = require('express');
const router = express.Router();
const Patient = require('../controller/CUD/patient_');

router.post('/', Patient.deletePatient);

module.exports = router;