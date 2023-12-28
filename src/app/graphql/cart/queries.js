import { gql } from "@apollo/client";

export const QUERY_ALL_MY_QUOTES = gql`
query MyQuery($customerId:Int!) {
    orders(where: {customerId: $customerId, statuses: YWRAQ_NEW}) {
      edges {
        node {
          
          id
          lineItems {
            edges {
              node {
                productId
                orderId
                id
                product {
                  node {
                    id
                    image {
                      link
                    }
                    name
                    ... on SimpleProduct {
                      price
                      id
                      name
                    }
                    ... on VariableProduct {
                      price
                      id
                      name
                    }
                  }
                }
                quantity
                subtotal
              }
            }
          }
          total
        }
      }
    }
  }
`



export const QUERY_GET_CART_DETAILS = gql`
query MyQuery {
    cart {
      contents {
        edges {
          node {
            key
            quantity
            product {
              node {
                id
                name
                productId
                ... on SimpleProduct {
                  price
                }
                image {
                  link
                }
              }
            }
            subtotal
            total
            subtotalTax
            tax
          }
        }
      }
      total
      totalTax
      subtotal
      totalTaxes {
        amount
        label
      }
    }
  }
`

