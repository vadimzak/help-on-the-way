import gql from 'graphql-tag';

export const GET_ADDRESS = gql`
mutation getAddress($address: AddressInput!){
  getAddress(input: {
    address: $address
  }){
    address{
      id,
    }
  }
}`;