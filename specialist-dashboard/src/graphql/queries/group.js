import gql from 'graphql-tag';

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
    allGroups{
      nodes{
        id,
        channels,
        type
      }
    }
  }`