const express = require("express");
const router = express.Router();
const physician_ = require("../controller/CRUD/user_");

router.put("/:id", physician_.updatePhysician);

module.exports = router;
