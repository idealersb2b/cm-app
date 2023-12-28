import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";




export const QUERY_ALL_POSTS = gql`
query MediaItems{
    mediaItems {
        edges {
          node {
            id
            description
            title
            sourceUrl
            mediaDetails {
              file
              height
              width
            }
            mediaItemUrl
            link
          }
        }
      }
}
`