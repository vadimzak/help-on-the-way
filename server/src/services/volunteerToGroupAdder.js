const postgraphqlQueryRunner = require('./postgraphqlQueryRunner');

const add = async (volunteerId, groupId) => {
    let promise = postgraphqlQueryRunner.mutation('createGroupVolunteer', 'groupVolunteer { nodeId }', {
        input: {
            graphqlType: 'CreateGroupVolunteerInput!',
            value: {
                groupVolunteer: { volunteerId, groupId }
            }
        }
    });

    promise = promise.catch(continueIfErrorIsDuplicateKey);

    await promise;
};

const continueIfErrorIsDuplicateKey = stringifiedError => {
    let error = JSON.parse(stringifiedError)[0];
    let volunteerExistsInGroup = error.message.indexOf('duplicate key value violates unique constraint') > -1;
    if (!volunteerExistsInGroup) throw stringifiedError;
};

module.exports = {
    add
};