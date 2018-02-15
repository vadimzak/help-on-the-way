import gql from 'graphql-tag'

export const ALL_TICKETS_QUERY = gql`{
  allTickets(condition: {
    status: OPEN
  }) {
    nodes {
      id
      personByElderId {
        id
        firstName
        lastName
        phoneNumber
      }
      description
      durationEta
      issuingInstitue
      dueDate
      addressByAddressId {
        id
        city
        street
        houseNumber
        enterance
        lat
        long
      }
      status
      createdBy
      maxVolunteers
    }
  }
}`;
