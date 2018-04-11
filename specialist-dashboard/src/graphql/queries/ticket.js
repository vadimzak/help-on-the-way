import gql from 'graphql-tag';
import { GROUP_FRAGMENT } from './group'


export const FULL_TICKET_FRAGMENT = gql`
fragment FullTicket on Ticket{
id
category
subCategory
elder: personByElderId {
  id
  firstName
  lastName
  phoneNumber
  gender
  address: addressByAddressId {
    id
    city
    street
    houseNumber
    floor
    enterance
    location
  }
}
groups: ticketGroupsByTicketId{
  nodes{
    group: groupByGroupId{
      ...groupFields
    }
  }
}
volunteers: ticketAssignedVolunteersByTicketId{
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
dueDate,
dueTime
destinationAddress: addressByDestinationAddressId {
  id
  city
  street
  houseNumber
  floor
  enterance
  location
}
endAddress: addressByEndAddressId {
  id
  city
  street
  houseNumber
  floor
  enterance
  location
}
startAddress: addressByStartAddressId {
  id
  city
  street
  houseNumber
  floor
  enterance
  location
}
issuingPerson: personByIssuingPerson{
  id,
  firstName,
  lastName,
  phoneNumber
  type
}
status
details
remarks
createdBy
isIndoor
isUrgent
createdAt
modifiedAt
elderMobility
transport
maxVolunteers
}
${GROUP_FRAGMENT}`

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

export const GET_BY_ID = gql`
query getTicketById($id: BigInt!){
  ticket: ticketById(id: $id){
    ...FullTicket
  }
}
${FULL_TICKET_FRAGMENT}`;

// TODO - all tickets shouldnt return full ticket, but only small part of the ticket fields
export const ALL_TICKETS_QUERY = gql`
query allTicketsSearchQuery($ticketStatus: TicketStatus!) {
    allTickets(condition: {status: $ticketStatus}, orderBy: CREATED_AT_DESC) {
      nodes {
        ...FullTicket
      }
    }
  }
  ${FULL_TICKET_FRAGMENT}`;

export const TICKET_BY_TYPE_COUNT = gql`
query ticketsByTypeCount($ticketStatus: TicketStatus!) {
    allTickets(condition: {status: $ticketStatus}) {
      totalCount
    }
  }`;

export const VOLUNTEERS_BY_TICKET_ID = gql `query getTicketVolunteers($ticketId : BigInt!){
  ticketById(id: $ticketId){
    volunteers: ticketAssignedVolunteersByTicketId{
     nodes{
      volunteer: personByVolunteerId{
        firstName,
        lastName
        phoneNumber
        groups: groupVolunteersByVolunteerId{
          nodes{
            group: groupByGroupId{
              channels
            }
          }
        }
      }
    } 
    }
  }
}`;
