const express = require('express');
const router = express.Router();
const user = require('../controller/CRUD/user_');
const verify = require('../middleware/jwtver');

router.route('/').get(user);

module.exports = router;