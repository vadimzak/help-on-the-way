const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, JWT_AUDIENCES } = process.env;
const jwtSignOptions = { noTimestamp: true };

const authCookieToHeader = (req, res, next) => {
    req.headers.authorization = req.session.authorization =
        req.session.authorization || generateAuthorization(req.user);
    return next();
};

const generateAuthorization = (user) => {
    if (!user) return undefined;

    const { id: person_id, type } = user;
    const jwt = jsonwebtoken.sign({ person_id, type, aud: JWT_AUDIENCES }, JWT_SECRET, jwtSignOptions);
    return `Bearer ${jwt}`;
}

module.exports = authCookieToHeader;