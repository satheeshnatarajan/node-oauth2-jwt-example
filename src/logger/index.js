const { ENV, ENV_KEY } = require("../../config/environment");
const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const logDir = "logs";

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const filename = path.join(logDir, "report.log");

/**
 * custom log print format
 */
const customFormat = format.printf((info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

/**
 * custom database / query logs
 */
const dbLogger = createLogger({
    level: "debug",
    format: format.combine(format.printf((info) => `Database logs: ${info.message}`)),
    transports: [new transports.Console()],
});

/**
 * create custom Console and File logger using winston
 */
const logger = createLogger({
    level: ENV.get(ENV_KEY.APP_LOG_LEVEL) || "info",
    format: format.combine(
        format.colorize(),
        format.label({ label: "session" }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), customFormat),
        }),
        new transports.File({
            filename,
            json: true,
            maxsize: 5242880,
            format: format.combine(customFormat),
        }),
    ],
});

/**
 * overwrite the morgan logger
 */
logger.stream = {
    write: (message) => {
        logger.info(message);
    },
};

/**
 * print only after the app server started successfully
 */
const appStartupLog = (port) => {
    logger.info(`\n
    \t  **************************************************** \n
    \t\t  Server Started in the ${port} \n
    \t  **************************************************** \n`);
};

global.logger = logger;
module.exports = {
    logger,
    dbLogger,
    appStartupLog,
};
