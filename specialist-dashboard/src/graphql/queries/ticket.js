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

export const ALL_TICKETS_QUERY = gql`
query allTicketsSearchQuery($ticketStatus: TicketStatus!) {
    allTickets(condition: {status: $ticketStatus}) {
      nodes {
        id
        category
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

export const TICKET_BY_TYPE_COUNT = gql`
query ticketsByTypeCount($ticketStatus: TicketStatus!) {
    allTickets(condition: {status: $ticketStatus}) {
      totalCount
    }
  }`;
