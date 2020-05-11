const Sequelize = require("sequelize");
const config = require("../../cli-migration/config/confighook");

const { dbLogger } = require("../logger");

/**
 * Initializing db connection
 */
const connection = new Sequelize(
    config.database, // database schema
    config.username, // database username
    config.password, // database password
    {
        host: config.host, // database host
        port: config.port, // database port
        dialect: config.dialect, // sequelize dialect
        logging: config.logging ? (str) => dbLogger.debug(str) : false, // database logging
        pool: {
            // database max pooling connection
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: false,
            paranoid: false,
        },
        sync: {
            force: false,
        },
    }
);

global.sequelize = connection;
module.exports = connection;
