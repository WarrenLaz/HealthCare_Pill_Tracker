const express = require('express');
const router = express.Router();
const patient = require('../controller/get/getpatient_');

router.route('/').post(patient);

module.exports = router;