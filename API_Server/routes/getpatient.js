const express = require('express');
const router = express.Router();
const patient = require('../controller/get/getpatient_');
const verify = require('../middleware/jwtver');

router.route('/').post(verify, patient);

module.exports = router;