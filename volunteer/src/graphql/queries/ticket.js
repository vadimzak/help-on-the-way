import gql from 'graphql-tag'

const ticketFieldsFragment = `
fragment ticketFields on TicketForVolunteer {
    id,
    category,
    details,
    subCategory,
    description,
    durationEta,
    dueDate,
    dueTime,
    fixedDueDate,
    fixedDueTime,
    status,
    elder,
    isIndoor,
    startAddress,
    destinationAddress,
    endAddress,
    transport,
    elderMobility,
    details
  }
`

export const GET_BY_ID = gql`
query getTicketByIdForVolunteer($ticketId: BigInt!){
  ticket: getTicketByIdForVolunteer(ticketId: $ticketId){
        assignedVolunteers,
        maxVolunteers
        ...ticketFields
        
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

export const GET_ASSIGNED_TICKETS = gql`
query{
  tickets: getCurrentVolunteerAssignedTickets{
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

export const UPDATE_TICKET_SCHEDULE = gql`
mutation updateTicketDateTime($ticketId: BigInt!, $dueDate: Date, $dueTime: Time){
  updateTicketDueDateForVolunteerById(input: {
    id: $ticketId,
    dueDate: $dueDate,
    dueTime: $dueTime
  }){
    clientMutationId,
  }
}`
