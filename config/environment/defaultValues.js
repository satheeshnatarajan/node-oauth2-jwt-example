const ENV_KEY = require("./environmentVariables");

module.exports = {
    ENV_DEFAULTS: {
        [ENV_KEY.DB_PORT]: 3306,
        [ENV_KEY.DB_LOGGING]: true,
        [ENV_KEY.APP_PORT]: 5000,
        [ENV_KEY.APP_LOG_LEVEL]: "debug",
        [ENV_KEY.ACCESS_TOKEN_LIFE_TIME]: 1800,
        [ENV_KEY.REFRESH_TOKEN_LIFE_TIME]: 3600,
    },
};
