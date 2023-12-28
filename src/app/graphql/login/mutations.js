import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

export const MUTATION_LOGIN = gql`
mutation LoginMutation($password: String!, $username: String!){
    login(
        input: {password: $password, username: $username }
    ){
        refreshToken
        authToken
        user {
          wooSessionToken
          username
          id
          databaseId
          roles {
            edges {
              node {
                name
                id
              }
            }
          }
          jwtAuthExpiration
        }
    }
}
`

// we will get the refresToken as output which we have to use for our requests

// {
//     "data": {
//       "login": {
//         "clientMutationId": null,
//         "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jbGVhbnRlY2gtbWFydC5jb20iLCJpYXQiOjE2ODk1Nzc3NjAsIm5iZiI6MTY4OTU3Nzc2MCwiZXhwIjoxNzIxMTEzNzYwLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2OTEiLCJ1c2VyX3NlY3JldCI6ImdyYXBocWxfand0XzY0YjRlN2VlOTgzZjIifX19.J4BuUwIN7l-7GaoX8_sd2M4pT1ob420_758A6SkIDfc",
//         "authToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jbGVhbnRlY2gtbWFydC5jb20iLCJpYXQiOjE2ODk1Nzc3NjAsIm5iZiI6MTY4OTU3Nzc2MCwiZXhwIjoxNjg5NTc4MDYwLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2OTEifX19.tsmxsrgzFraz_JHU0ftsXhwz4w1PKELAI9ZHQB_SEsQ"
//       }
//     },
//     "extensions": {
//       "debug": [
//         {
//           "type": "DEBUG_LOGS_INACTIVE",
//           "message": "GraphQL Debug logging is not active. To see debug logs, GRAPHQL_DEBUG must be enabled."
//         }
//       ]
//     }
//   }