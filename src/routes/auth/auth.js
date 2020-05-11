const express = require("express");
const { ValidationError, DataNotFoundError } = require("../../error");

const { User } = require("../../model");

const { obtainToken } = require("../../oauth/oauth2-adapter");

const router = express.Router();

router.post(["/login", "/token"], obtainToken);

router.post("/forgot/password", (req, res, next) => {
    const { body: { username } = {} } = req;

    if (!username) {
        return next(new ValidationError("Missing username!"));
    }

    return User.findOne({ where: { username } })
        .then((user) => {
            if (!user) return next(new DataNotFoundError("Invalid username!"));
            return res.json(user);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
