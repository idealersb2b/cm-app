import { gql } from "@apollo/client";


export const QUERY_GET_CUSTOMER_BILLING_AND_SHIPPING_DETAILS = gql`
query MyQuery($id: ID!) {
    customer(id: $id) {
      billing {
        email
        firstName
        address1
        address2
        city
        company
        country
        lastName
        phone
        postcode
        state
      }
      shipping {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
    }
  }
`

export const QUERY_GET_CUSTOMER_DETAILS = gql`
query MyQuery($id: ID!){
    customer(id: $id){
        firstName
        lastName
        email
    }
}
`


