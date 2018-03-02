import gql from 'graphql-tag';

export const UPDATE_ADDRESS = gql`
  mutation ($id: Int!, $addressPatch: AddressPatch!) {
    updateAddressById(input: {
      id: $id,
      addressPatch: $addressPatch
    }) {
      address {
        id
      }
  }}`;