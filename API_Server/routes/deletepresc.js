const express = require("express");
const router = express.Router();
const presc_ = require("../controller/CRUD/presc_");

router.delete("/:id", presc_.deletePres);

module.exports = router;
