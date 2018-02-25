const axios = require('axios');
const postgraphqlQueryRunner = require('./postgraphqlQueryRunner');

const makeCall = async (method, url, params) => {
    let result = await axios.request({
        url, 
        method,
        params: method == 'get' ? params : undefined,
        data: method !== 'get' ? params : undefined,
        validateStatus: status =>  status >= 200 && status < 500
    });

    await saveData({
        request: {
            method,
            url,
            params
        }, 
        result: result.data
    });

    return result;
};

const saveData = data => {
    postgraphqlQueryRunner.mutation('createExternalApiRequestsLog', 'externalApiRequestsLog { id }', {
		input: {
			graphqlType: 'CreateExternalApiRequestsLogInput!',
			value: {
				data
			}
		}
	});
};

module.exports = {
    makeCall
};