import { gql } from "@apollo/client";

export const QUERY_GET_USER_TOKENS = gql`
query MyQuery($id: ID!) {
    user(id: $id, idType: DATABASE_ID) {
      id
      firstName
      jwtRefreshToken
      jwtAuthToken
      wooSessionToken
      username
    	databaseId
      jwtAuthExpiration
    	roles {
            edges {
              node {
                name
                id
              }
            }
          }
    }
  }`



export const QUERY_GET_USER = gql`
query MyQuery($id: ID = "dXNlcjo2ODU") {
    user(id: $id) {
      email
      firstName
      id
    }
  }
`

export const QUERY_GET_USERS = gql`
query MyQuery{
    users {
      edges {
        node {
          firstName
          email
          id
        }
      }
    }
  }
`