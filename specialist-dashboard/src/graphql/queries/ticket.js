import gql from 'graphql-tag';
import { GROUP_FRAGMENT } from './group'

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
    allTickets(condition: {status: $ticketStatus}, orderBy: CREATED_AT_DESC) {
      nodes {
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
        dueDate
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
        status
        details
        remarks
        createdBy
        isIndoor
        isUrgent
        createdAt
        maxVolunteers
      }
    }
  }${GROUP_FRAGMENT}`;

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
