import { gql } from "@apollo/client";


export const MUTATION_ADD_CART_ITEMS = gql`
mutation MyMutation($productId: Int! $quantity: Int!) {
    addCartItems(input: {items: [{productId: $productId, quantity: $quantity}]}) {
      added {
        total
      }
      cart {
        total
      }
    }
  }
`

export const MUTATION_REMOvE_CART_ITEMS = gql`
mutation MyMutation( $keys: [ID!], $all: Boolean = false) {
    removeItemsFromCart(input: {keys: $keys, all: $all}) {
      cart {
        contents {
          edges {
            node {
              key
              quantity
              total
              product {
                node {
                  image {
                    link
                  }
                  productId
                  id
                }
              }
            }
          }
        }
        total
      }
    }
  }
`

//  input format -> items: [{key, quantity}]
export const MUTATION_UPDATE_CART_ITEM_QUANTITIES = gql`
mutation udpateCartItemQuantities($items: [CartItemQuantityInput!],$clientMutationId:String!)
{
  updateItemQuantities(input: {items: $items,clientMutationId:$clientMutationId}) {
    cart {
      contents {
        edges {
          node {
            key
            quantity
            product {
              node {
                image {
                  link
                }
              }
            }
            total
          }
        }
        itemCount
      }
      contentsTotal
      contentsTax
      total
      discountTotal
    }
  }
}
`;

