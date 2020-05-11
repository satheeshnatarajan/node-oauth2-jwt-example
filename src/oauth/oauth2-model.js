const JWT = require("jsonwebtoken");
const oAuth2Config = require("./oauth2-config");
const { UnauthorizedRequestError } = require("oauth2-server");

const { User } = require("../model");
const { ENV, ENV_KEY } = require("../../config/environment");

/**
 * Generate Access / Refresh Token
 * @param {object} client - client credentials
 * @param {object} user - User
 * @param {string} type - either accessToken / refreshToken
 * @returns {string} - JWT Token
 */
const generateToken = (client, user, type) => {
    let secret;
    const exp = new Date();

    if (type === "accessToken") {
        secret = ENV.get(ENV_KEY.AUTH_ACCESS_TOKEN_SECRET);
        exp.setSeconds(exp.getSeconds() + client.accessTokenLifetime);
    } else {
        secret = ENV.get(ENV_KEY.AUTH_REFRESH_TOKEN_SECRET);
        exp.setSeconds(exp.getSeconds() + client.refreshTokenLifetime);
    }
    const payload = {
        iss: ENV.get(ENV_KEY.AUTH_ISSUER),
        user: { id: user.id },
        client: { id: client.clientId },
        exp: exp.getTime(),
    };

    return JWT.sign(payload, secret);
};

/**
 * Generate Access Token
 * @param {object} client - client credentials
 * @param {object} user - User
 * @returns {string} - JWT Token
 */
const generateAccessToken = (client, user) => generateToken(client, user, "accessToken");

/**
 * Generate Refresh Token
 * @param {object} client - client credentials
 * @param {object} user - User
 * @returns {string} - JWT Token
 */
const generateRefreshToken = (client, user) => generateToken(client, user, "refreshToken");

/**
 * validate access_token
 * @param {string} bearerToken - Bearer JWT token
 * @returns {object}
 */
const getAccessToken = (bearerToken) => {
    return JWT.verify(bearerToken, ENV.get(ENV_KEY.AUTH_ACCESS_TOKEN_SECRET), function (err, decoded) {
        if (err) {
            throw new UnauthorizedRequestError(err);
        }

        return {
            accessTokenExpiresAt: new Date(decoded.exp),
            user: decoded.user,
        };
    });
};

/**
 * Validate refresh_token
 * @param {string} bearerToken - Bearer JWT token
 * @returns {object}
 */
const getRefreshToken = (bearerToken) => {
    return JWT.verify(bearerToken, ENV.get(ENV_KEY.AUTH_REFRESH_TOKEN_SECRET), function (err, decoded) {
        if (err) {
            throw new UnauthorizedRequestError(err);
        }

        return {
            refreshTokenExpiresAt: new Date(decoded.exp),
            user: decoded.user,
            client: decoded.client,
        };
    });
};

/**
 * @description
 * Invoked to retrieve a client using a client id or a client id/client secret combination,
 * depending on the grant type
 */
const getClient = (clientId, clientSecret) =>
    oAuth2Config.clients.find((client) => client.clientId === clientId && client.clientSecret === clientSecret);

/**
 * @description
 * Method used only by client_credentials grant type.
 */
const getUserFromClient = (client) =>
    oAuth2Config.clients.find(
        (savedClient) => savedClient.clientId === client.clientId && savedClient.clientSecret === client.clientSecret
    );

/**
 * Response object after successful token creation
 * @param {object} token - {accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt}
 * @param {object} client - Client Credential
 * @param {object} user - User
 * @returns {{client: {id: ({type: number}|{type: *}|string)}, user: {id: *}}}
 */
const saveToken = (token, client, user) => {
    return { ...token, client: { id: client.clientId }, user: { id: user.id } };
};

/**
 * @description
 * Validate user credential from database
 */
const getUser = async (username, password) => {
    const user = await User.findOne({ where: { username, password } });
    return user;
};

/**
 * Revoke token
 * TODO: Need to verify
 * @returns {boolean}
 */
const revokeToken = () => true;

/**
 * @description
 * oAuth2 Model
 * Mandate and Override Function
 */
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    getAccessToken,
    getRefreshToken,
    getUserFromClient,
    getClient,
    saveToken,
    getUser,
    revokeToken,
};
