const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const jwtSignOptions = { noTimestamp: true };

const loginHandler = (req, res) => {
    const { userName, password } = req.body;
    const authData = validate({ userName, password });
    if (authData) {
        const jwt = jsonwebtoken.sign(authData, JWT_SECRET, jwtSignOptions);
        res.cookie('authorization', `Bearer ${jwt}`);
        res.status(200).json('ok');
    } else {
        res.status(401).json('bad');
    }
};

function validate(loginData) {
    return { a: 1 };
}

module.exports = loginHandler;