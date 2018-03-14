import gql from 'graphql-tag'

export const GET_BY_ID = gql`
mutation getTicketById($ticketId: BigInt!){
    getTicketById(input: {
      ticketId: $ticketId
    }) {
      ticketForVolunteer{
  description,
  durationEta,
  issuingInstitue,
  dueDate,
  status,
  maxVolunteers,
  elderId,
  elderFirstName,
  elderLastName,
  elderPhoneNumber,
  startAddressId,
  startAddressCity,
  startAddressStreet,
  startAddressHouseNumber,
  startAddressEnteranced,
  destinationAddressId,
  destinationAddressCity,
  destinationAddressStreet,
  destinationAddressHouseNumber,
  destinationAddressEnteranced,
  endAddressId,
  endAddressCity,
  endAddressStreet,
  endAddressHouseNumber,
  endAddressEnteranced,
      }
    }
  }`
