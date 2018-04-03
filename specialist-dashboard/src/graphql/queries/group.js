import gql from 'graphql-tag';

export const GROUP_FRAGMENT = `
fragment groupFields on Group{
  id,
  channels,
  type,
  volunteers: groupVolunteersByGroupId{
    count: totalCount
  }
}
`

export const CREATE = gql`
mutation createGroup($group: GroupInput!){
    createGroup(input: {
      group: $group,
    }){
      group{
        id
      }
    }
  }`

export const GET_ALL = gql`
query getGroups{
  ...groupFields
}
${GROUP_FRAGMENT}`

export const ASSIGN_GROUP_TO_TICKET = gql`
mutation assignGroupToTicket($ticketId: BigInt!, $groupId: Int! ){
  createTicketGroup(input: {
    ticketGroup: {
      ticketId: $ticketId,
      groupId: $groupId,
    }
  }){
    ticketGroup{
      groupId,
      ticketId,
    }
  }
}
`

export const UNASSIGN_GROUP_FROM_TICKET = gql`
mutation unassignGroupToTicket($ticketId: BigInt!, $groupId: Int! ){
  deleteTicketGroupByTicketIdAndGroupId(input: {
      ticketId: $ticketId,
      groupId: $groupId,
  }){
    clientMutationId
  }
}`