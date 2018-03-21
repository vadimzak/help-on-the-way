import gql from 'graphql-tag';


export const UPDATE_TICKET = gql`
  mutation ($id: BigInt!, $ticket: TicketPatch!) {
    updateTicketById(input: {
      id: $id,
      ticketPatch: $ticket
    }) {
      ticket {
        id
      }
  }}`;

export const CREATE_TICKET = gql`
mutation createTicket($ticket: TicketInput!) {
    createTicket(input: {
      ticket: $ticket
    }) {
      ticket {
        id,
      }
    }
  }`;

export const ALL_TICKETS_QUERY = gql`{
    allTickets(condition: {}) {
      nodes {
        id
        personByElderId {
          id
          firstName
          lastName
          phoneNumber
          addressByAddressId {
            id
            city
            street
            houseNumber
            floor
            enterance
            location
          }
        }
        ticketAssignedVolunteersByTicketId{
           nodes {
            personByVolunteerId {
              firstName
              lastName
              phoneNumber
              addressByAddressId {
                id
                city
                street
                houseNumber
                floor
                enterance
                location
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
          floor
          enterance
          location
        }
        addressByEndAddressId {
          id
          city
          street
          houseNumber
          floor
          enterance
          location
        }
        addressByStartAddressId {
          id
          city
          street
          houseNumber
          floor
          enterance
          location
        }
        status
        createdBy
        maxVolunteers
      }
    }
  }`;
    