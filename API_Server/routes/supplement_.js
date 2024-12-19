const express = require('express');
const router = express.Router();
const presc_ = require('../controller/CRUD/presc_');

router.post('/', presc_.addPrescription);

module.exports = router;