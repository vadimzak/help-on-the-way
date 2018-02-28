import gql from 'graphql-tag';


export const AUTO_COMPLETE_PERSON_OF_TYPE = gql`
mutation autoCompletePersonOfType($input: GetPersonByConditionInput!){
  getPersonByCondition( input: $input) {
      people{
        id,
        firstName,
        lastName,
        type,
        phoneNumber,
        address: addressByAddressId{
          city,
          street,
          houseNumber,
        }
      }
    }
  }`;