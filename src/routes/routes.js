const express = require("express");

const { authenticate } = require("../oauth/oauth2-adapter");
const auth = require("./auth/auth");
const api = require("./api/api");

const router = express.Router();

router.use("/auth", auth);
router.use("/api", authenticate, api);
router.get("/", (req, res) => res.send("App Running!"));

module.exports = router;
