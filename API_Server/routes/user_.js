const express = require("express");
const router = express.Router();
const user = require("../controller/CRUD/user_");

router.route("/").get(user.getUser);

module.exports = router;
