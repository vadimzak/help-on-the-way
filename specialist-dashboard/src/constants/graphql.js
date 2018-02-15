import gql from 'graphql-tag'

export const UPDATE_TICKET = gql`
  mutation ($id: Int!, $ticketPatch: TicketPatch!) {
    updateTicketById(input: {
      id: $id,
      ticketPatch: $ticketPatch
    }) {
      ticket {
        id
      }
  }}`;

export const UPDATE_ADDRESS = gql`
  mutation ($id: Int!, $addressPatch: AddressPatch!) {
    updateAddressById(input: {
      id: $id,
      addressPatch: $addressPatch
    }) {
      address {
        id
      }
  }}`;

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
        addressByAddressId {
          city
          street
          houseNumber
        }
      }
      ticketMatchedVolunteersByTicketId{
         nodes {
          personByVolunteerId {
            firstName
            lastName
            phoneNumber
            addressByAddressId {
              city
              street
              houseNumber
            }
          }
        }
      }
      description
      durationEta
      issuingInstitue
      dueDate
      addressByDestinationAddressId {
        id
        city
        street
        houseNumber
        enterance
      }
      addressByEndAddressId {
        id
        city
        street
        houseNumber
        enterance
      }
      addressByStartAddressId {
        id
        city
        street
        houseNumber
        enterance
      }
      status
      createdBy
      maxVolunteers
    }
  }
}`;
