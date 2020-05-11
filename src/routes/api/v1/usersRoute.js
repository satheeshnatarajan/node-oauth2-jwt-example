const express = require("express");

const router = express.Router();

const Users = require("../../../model/user");

/* GET users listing. */
router.get("/users", async (req, res) => {
    const user = await Users.findAll();
    res.json(user);
});

/* GET loggedIn user detail */
router.get("/profile", async (req, res) => {
    const user = await Users.findOne({ where: { id: res.locals.oauth.user.id } });
    res.json(user);
});

module.exports = router;
