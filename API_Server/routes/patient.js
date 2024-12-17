const express = require('express');
const router = express.Router();
const Patient = require('../controller/CRUD/patient_');

router.route('/')
.post(Patient.addPatient)
.get(Patient.getPatients)
.delete(Patient.deletePatient)
.put(Patient.updatePatient);

module.exports = router;