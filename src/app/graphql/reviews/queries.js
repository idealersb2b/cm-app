import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_REVIEWS = gql`
query MyQuery($id: ID = 20727, $idType: ProductIdTypeEnum = DATABASE_ID) {
    product(id: $id, idType: $idType) {
      reviews {
        edges {
          node {
            author {
              node {
                name
                id
              }
            }
            id
            content
          }
          rating
        }
        averageRating
      }
    }
  }
`