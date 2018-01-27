const authCookieToHeader = (req, res, next) => {
    req.headers.authorization = req.headers.authorization || req.cookies.authorization;
    next();
};

module.exports = authCookieToHeader;