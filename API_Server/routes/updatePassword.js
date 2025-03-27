const express = require("express");
const router = express.Router();
const updatePass = require("../controller/updatePassword_");

router.post("/", updatePass);

module.exports = router;
