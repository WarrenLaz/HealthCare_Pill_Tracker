const express = require('express');
const router = express.Router();
const search_ = require("../controller/CRUD/getmeds_")

router.post('/',search_);

module.exports = router;