
export const QUERY_GET_BRANDS_AND_THEIR_PRODUCTS = gql`

query Brands {
    allPaBrands(first: 300, after: "first") {
      edges {
        node {
          name
          products {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
` 