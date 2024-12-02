const express = require('express');
const router = express.Router();
const dash = require('../controller/get/getuser_');
const verify = require('../middleware/jwtver');

router.route('/').post(dash);

module.exports = router;