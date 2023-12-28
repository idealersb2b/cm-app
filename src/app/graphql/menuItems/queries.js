import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";


export const QUERY_ALL_POSTS = gql`
query getMenuItems{
menuItems {
    edges {
      node {
        url
      }
    }
  }
}
`