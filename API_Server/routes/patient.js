const express = require('express');
const router = express.Router();
const Patient = require('../controller/CRUD/patient_');
const verify = require('../middleware/jwtver');

router.route('/')
.post(verify, Patient.addPatient)
.get(verify, Patient.getPatients)
.delete(Patient.deletePatient)
.put(Patient.updatePatient);

module.exports = router;