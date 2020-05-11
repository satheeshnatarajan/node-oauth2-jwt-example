const { ENV, ENV_KEY } = require("../../config/environment");

module.exports = {
    username: ENV.get(ENV_KEY.DB_USERNAME),
    password: ENV.get(ENV_KEY.DB_PASSWORD),
    database: ENV.get(ENV_KEY.DB_SCHEMA),
    host: ENV.get(ENV_KEY.DB_HOST),
    port: ENV.get(ENV_KEY.DB_PORT),
    dialect: "mysql",
    logging: ENV.get(ENV_KEY.DB_LOGGING),
};
