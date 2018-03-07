import gql from 'graphql-tag';


export const UPDATE_TICKET = gql`
  mutation ($id: Int!, $ticket: TicketPatch!) {
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
            city
            street
            houseNumber
          }
        }
        ticketAssignedVolunteersByTicketId{
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
    