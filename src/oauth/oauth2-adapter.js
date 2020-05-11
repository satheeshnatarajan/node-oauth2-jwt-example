const OAuth2Server = require("oauth2-server");

const model = require("./oauth2-model");
const { Request, Response } = OAuth2Server;

/**
 * @description
 * Retrieves a new token for an authorized token request
 */
function obtainToken(req, res) {
    const {
        app: { oauth },
    } = req;

    return oauth
        .token(new Request(req), new Response(res))
        .then((token) => {
            const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, client } = token;
            return res
                .cookie("access_token", accessToken, { expires: accessTokenExpiresAt, httpOnly: true })
                .cookie("refresh_token", refreshToken, { expires: refreshTokenExpiresAt, httpOnly: true })
                .json({ access_token: accessToken, refresh_token: refreshToken, clientId: client.id });
        })
        .catch((err) => res.status(err.code || 500).json(err));
}

/**
 * @description - middleware
 * Authenticates a request
 */
function authenticate(req, res, next) {
    const {
        app: { oauth },
    } = req;

    // took access_token from cookie if it missed in header
    const { headers, cookies: { access_token } = {} } = req;
    if (headers && !headers.authorization) {
        req.headers.authorization = `Bearer ${access_token}`;
    }

    return oauth
        .authenticate(new Request(req), new Response(res))
        .then(({ user }) => {
            res.locals.oauth = { user };
            next();
        })
        .catch((err) => res.status(err.code || 500).json(err));
}

const oauth2 = new OAuth2Server({ model, allowBearerTokensInQueryString: true });

module.exports = {
    oauth2,
    obtainToken,
    authenticate,
};
