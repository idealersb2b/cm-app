import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
// user(id: "dXNlcjo1MzU=") {
//     posts {
//       edges {
//         node {
//           id
//         }
//       }
//     }
//     description
//     id
//     lastName
//     nicename
//     nickname
//   }
let id = "dXNlcjo4ODM="
//($vendorID: ${id})
export const GET_STORE_VENDOR_DETAILS = gql`
query MyQuery($vendorId: ID!) {
  user(id: $vendorId) {
    id
    name
    roles {
      edges {
        node {
          id
          name
        }
      }
    }
    description
    email
    firstName
    username
    userId
    lastName
    databaseId
  }
}`
