const externalApiCallsMaker = require('./externalApiCallsMaker');

const baseObject = {
    api_key: process.env.TWILO_API_KEY,
    country_code: 972,
};
const startBaseObject = Object.assign({}, baseObject, {
    via: 'sms',
    code_length: 4,
    locale: 'he'
});

const start = async phone_number => {
    return await externalApiCallsMaker.makeCall(
        'post',
        'https://api.authy.com/protected/json/phones/verification/start',
        Object.assign({
            phone_number
        }, startBaseObject)
    );
};

const verify = async (phone_number, verification_code) => {
    return await externalApiCallsMaker.makeCall(
        'get',
        'https://api.authy.com/protected/json/phones/verification/check',
        Object.assign({
            phone_number,
            verification_code
        }, baseObject)
    );
};

module.exports = {
    start,
    verify
};