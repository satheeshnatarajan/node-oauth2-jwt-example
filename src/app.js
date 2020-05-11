const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

require("./logger");
require("./database/connection");

const { oauth2 } = require("./oauth/oauth2-adapter");

const app = express();
app.oauth = oauth2;

/**
 * use required middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: logger.stream }));

/**
 * set custom headers for CORS
 * allow all method types
 */
app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

app.use("/", require("./routes/routes"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    if (err) {
        // render the error page
        res.status(err.status || 500);
        res.json(err);
    } else {
        next();
    }
});

module.exports = app;
