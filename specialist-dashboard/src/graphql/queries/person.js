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
        gender,
        address: addressByAddressId{
          id,
          city,
          street,
          houseNumber,
          floor,
          enterance,
          geom,
          location
        }
      }
    }
  }`;

export const CREATE = gql`
mutation createPerson($person: PersonInput!){
  createPerson(input: {
    person: $person,
  }){
    person{
      id
    }
  }
}
  `

export const UPDATE = gql`
mutation updatePerson($id: Int!, $person: PersonPatch!){
  updatePersonById(input: {
    id: $id,
    personPatch: $person
  }){
      person{
        id
      }
    }
  }
  `

export const ALL_PEOPLE_OF_TYPE = gql`
query allPeopleOfType($type: PersonType!){
  allPeople(condition: {type: $type}) {
    nodes {
      id
      firstName
      lastName
      phoneNumber
      addressByAddressId {
        street
        houseNumber
        city
      }            
    }
}
}`;