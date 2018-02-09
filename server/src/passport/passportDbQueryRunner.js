const postgraphqlQueryRunner = require('../postgraphql/postgraphqlQueryRunner');
const PERSON_GRAPHQL_QUERY = 'person {id}';

const findUserByFacebookId = async facebookProfileId => {
    const { person } = await postgraphqlQueryRunner.mutation(
        'findUserBySocial',
        PERSON_GRAPHQL_QUERY,
        {
            input: {
                graphqlType: 'FindUserBySocialInput!',
                value: {
                    'type': 'FACEBOOK',
                    'pId': facebookProfileId
                }
            }
        }
    );
    return person;
};

const createUserFromFacebookProfile = async profile => {
    const [firstName, lastName] = profile.displayName.split(' ');

    const { person } = await postgraphqlQueryRunner.mutation(
        'registerPerson',
        PERSON_GRAPHQL_QUERY,
        {
            input: {
                graphqlType: 'RegisterPersonInput!',
                value: {
                    firstName,
                    lastName,
                    'type': 'FACEBOOK',
                    'data': { profile: profile._json }
                }
            }
        }
    );
    return person;
};

const getUserById = async userId => await postgraphqlQueryRunner.query('personById', 'id, type', { id: userId });

module.exports = {
    findUserByFacebookId,
    createUserFromFacebookProfile,
    getUserById
}