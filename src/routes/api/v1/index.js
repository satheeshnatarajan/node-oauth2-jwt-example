const express = require("express");

const router = express.Router();
const users = require("./usersRoute");

router.use("/", [users]);

module.exports = router;
