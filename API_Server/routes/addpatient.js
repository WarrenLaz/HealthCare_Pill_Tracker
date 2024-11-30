const express = require('express');
const router = express.Router();
const addpatient = require('../controller/addpatient_');

router.post('/', addpatient);

module.exports = router;