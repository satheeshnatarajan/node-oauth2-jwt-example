require("dotenv").config();
const ENV_KEY = require("./environmentVariables");
const { ENV_DEFAULTS } = require("./defaultValues.js");

const MANDATORY_ENV_VARIABLES = [ENV_KEY.DB_USERNAME, ENV_KEY.DB_PASSWORD, ENV_KEY.DB_SCHEMA, ENV_KEY.DB_HOST];
const ENV_PROPERTIES = {};

/**
 * get system env variable
 * @param {string} key
 * @returns {string}
 */
function getEnvProperty(key) {
    return process.env[key];
}

// process exit while mandatory environment variable has not configured
for (const key of MANDATORY_ENV_VARIABLES) {
    if (getEnvProperty(key) === undefined) {
        throw new Error(
            `Please configure the all mandatory environmental variables\n${MANDATORY_ENV_VARIABLES.join(", ")}\n`
        );
    }
}

// store the env variables into object
for (const key in ENV_KEY) {
    if (ENV_KEY.hasOwnProperty(key)) {
        ENV_PROPERTIES[key] = getEnvProperty(ENV_KEY[key]) || ENV_DEFAULTS[key];
    }
}

if (process.env.NODE_ENV === "production") {
    ENV_PROPERTIES[ENV_KEY.APP_START_UP] = "App Started as Production";
} else {
    ENV_PROPERTIES[ENV_KEY.APP_START_UP] = "App Started as Development";
}

module.exports = {
    ENV_KEY,
    ENV: {
        /**
         * Get Environment Variable value
         * @param {string} key - env key
         * @returns {{string|number}}
         */
        get(key) {
            return ENV_PROPERTIES[key];
        },
    },
};
