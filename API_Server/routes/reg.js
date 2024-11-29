const express = require('express');
const router = express.Router();
const reg = require('../controller/reg_');

router.post('/',reg);

module.exports = router;