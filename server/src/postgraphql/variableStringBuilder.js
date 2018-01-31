const build = variables => {
    return variables ? Object.keys(variables).map(keyName => `$${keyName}: ${getType(variables[keyName])}`).join(',') : '';
}

const getType = value => {
    if (isString(value)) return 'String!';
    else if (isBoolean(value)) return 'Boolean!';
    else if (Number.isInteger(value)) return 'Int!';
    else if (isFloat(value)) return 'Float!';
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
};

function isBoolean(value) {
    return typeof value === 'boolean';
};

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

module.exports = {
    build
};