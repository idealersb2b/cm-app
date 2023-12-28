import { gql } from "@apollo/client";

export const CHECKOUT_MUTATION = gql`
mutation CHECKOUT_MUTATION($address1: String = "abc street", $address11: String = "abc street") {
    checkout(
      input: {billing: {address1: $address1, country: IN}, shipping: {address1: $address11, country: IN}, paymentMethod: "yith-request-a-quote", isPaid: true}
    ) {
      clientMutationId
      order {
        id
        orderKey
        orderNumber
        status
        paymentMethod
        total
      }
      result
      redirect
    }
  }
`;

export const MUTATION_EMPTY_CART = gql`
mutation MyMutation {
 emptyCart(input: {clearPersistentCart: true}) {
  cart {
   isEmpty
   total
  }
 }
}`

