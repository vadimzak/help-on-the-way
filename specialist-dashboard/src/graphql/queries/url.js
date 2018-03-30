import gql from 'graphql-tag'

export const GET_SHORT_URL = gql`
  mutation getShortUrl($metadata : JSON!){
    getShortUrl(input: {
      metadata: $metadata
    }) {
      string
    }
  }`;