const build = variables => {
    if (!variables) return [];

    return Object.entries(variables).map(([name, item]) => {
        if (item.graphqlType) {
            var type = item.graphqlType;
            var value = item.value;
        } else {
            var type = getType(item);
            var value = item;
        }
        return { name, type, value };
    })
};

const getType = value => {
    if (isString(value)) return 'String!';
    else if (isBoolean(value)) return 'Boolean!';
    else if (Number.isInteger(value)) return 'Int!';
    else if (isFloat(value)) return 'Float!';
    
    throw 'unknown type';
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