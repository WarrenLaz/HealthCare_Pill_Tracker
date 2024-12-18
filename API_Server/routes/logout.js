const express = require("express");
const router = express.Router();
const handleLogout = require('../controller/logout_')

router.get("/", handleLogout);

module.exports = router;
