import gql from 'graphql-tag'

const ticketFieldsFragment = `
fragment ticketFields on TicketForVolunteer {
  description,
    durationEta,
    dueDate,
    status,
    maxVolunteers,
    elder,
    startAddress,
    destinationAddress,
    endAddress,
  }
`

export const GET_BY_ID = gql`
mutation getTicketById($ticketId: BigInt!){
    getTicketById(input: {
      ticketId: $ticketId
    }) {
      ticketForVolunteer{
        ...ticketFields
      }
    }
  }
  ${ticketFieldsFragment}
  `

export const GET_AVAILABLE_TICKETS = gql`
query{
  tickets: getCurrentVolunteerAvailableTickets{
    nodes{
      ...ticketFields
    }
  }
}
${ticketFieldsFragment}
`

export const ASSIGN_TICKET = gql`mutation assignTicket($ticketId: BigInt! ) {
assignCurrentUserToTicket(input: {
    ticketId: $ticketId,
  }){
    clientMutationId
  }
}`
