import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";


export const QUERY_GET_PRODUCT = gql`
query getProduct($productId: ID!)  {
    product(id: $productId, idType: ID) {
              id
              productId
              name
              sku
              uri
              databaseId
              slug
              ... on SimpleProduct {
                price
              }
              related {
                edges {
                  node {
                    id
                    name
                    title
                    image {
                            link
                    }
                    ... on SimpleProduct{
                                  price
                                  stockStatus
                    }
                    ... on VariableProduct{
                      price
                      stockStatus
                    }
                  }
                }
              }
              visibleProducts {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              productTags {
                edges {
                  node {
                    name
                    productTagId
                    taxonomyName
                    termGroupId
                    taxonomy {
                      node {
                        name
                      }
                    }
                  }
                }
              }
              description
              averageRating
              purchasable
              purchaseNote
              title
              totalSales
              type
              attributes {
                edges {
                  node {
                    attributeId
                    label
                    name
                    options
                    position
                    variation
                  }
                }
              }
              reviews {
                averageRating
                edges {
                  rating
                  node {
                    content
                  }
                }
              }
              galleryImages {
                edges {
                  node {
                    link
                    id
                  }
                }
              }
              shortDescription(format: RENDERED)
              sku
              slug
              image {
                link
                altText
                mediaDetails {
                  height
                  width
                }
                srcSet
                title
              }
              terms {
                edges {
                  node {
                    name
                  }
                }
              }
              status
              reviewCount
              productTypes {
                edges {
                  node {
                    name
                  }
                }
              }
              excerpt
              metaData {
                value
              }
              productCategories(where: {childless: true}) {
                edges {
                  node {
                    name
                    id
                    ancestors {
                      edges {
                        node {
                          name
                          id
                        }
                      }
                    }
                  }
                }
              }
              commentCount
              commentStatus
              content
              lastEditedBy {
                node {
                  id
                  firstName
                  userId
                }
              }
              ... on VariableProduct {
                id
                name
                variations {
                  edges {
                    node {
                      id
                      name
                      price
                      sku
                      purchasable
                      databaseId
                      attributes {
                        edges {
                          node {
                            value
                            label
                            name
                          }
                        }
                      }
                      stockQuantity
                      stockStatus
                      status
                    }
                  }
                }
                status
                stockQuantity
                stockStatus
              }
              upsell {
                edges {
                  node {
                    id
                    name
                    image {
                      link
                    }
                    ... on SimpleProduct {
                      price
                    }
                    ... on VariableProduct {
                      price
                      crossSell {
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
            }
          }`



export const QUERY_GET_PRODUCTS_SEARCH_DROPDOWN = gql`
query getProducts($search: String!) {
    products(first: 7, where: {search: $search}) {
      edges {
        node {
          id
          name
          productId
          status
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct{
              price
          }
        }
      }
    }
  }
`


// shortDescription will give you 