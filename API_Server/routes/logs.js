const express = require("express");
const router = express.Router();
const Log = require('../controller/pillLog')

router.post("/", Log);

module.exports = router;
