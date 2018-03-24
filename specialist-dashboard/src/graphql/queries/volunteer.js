import gql from 'graphql-tag'

export const ASSIGN_VOLUNTEER_TO_GROUP = gql`
mutation assignVolunteerToGroup($volunteerId: Int!, $groupId: Int! ){
    createGroupVolunteer(input: {
      groupVolunteer: {
        volunteerId: $volunteerId,
        groupId: $groupId,
      }
    }){
      groupVolunteer{
        groupId,
        volunteerId,
      }
    }
  }
`
