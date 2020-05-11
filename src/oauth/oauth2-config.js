const { ENV, ENV_KEY } = require("../../config/environment");
const { CONSTANT } = require("../../config/constant");

module.exports = {
    clients: [
        {
            name: CONSTANT.OAUTH.WEB_APP,
            id: ENV.get(ENV_KEY.APP_CLIENT_ID),
            clientId: ENV.get(ENV_KEY.APP_CLIENT_ID),
            clientSecret: ENV.get(ENV_KEY.APP_CLIENT_SECRET),
            grants: ["password", "refresh_token", "client_credentials"],
            accessTokenLifetime: ENV.get(ENV_KEY.ACCESS_TOKEN_LIFE_TIME),
            refreshTokenLifetime: ENV.get(ENV_KEY.REFRESH_TOKEN_LIFE_TIME),
        },
    ],
};
