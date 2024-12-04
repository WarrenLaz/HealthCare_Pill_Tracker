const express = require("express");
const router = express.Router();
const login = require("../controller/login_");

router.post("/", login);

module.exports = router;
