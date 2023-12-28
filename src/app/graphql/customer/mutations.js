import { gql } from "@apollo/client";

export const MUTATION_REGISTER_CUSTOMER = gql`
  mutation MyMutation {
    registerCustomer(
      input: {
        password: "customer103"
        username: "customer103"
        email: "customer103@gmail.com"
        clientMutationId: "kGfrdqgWrK6MqQloKOC9"
      }
    ) {
      refreshToken
      customer {
        email
      }
      clientMutationId
    }
  }
`;

export const MUTATION_UPDATE_CUSTOMER_BILLING_AND_SHIPPING_METHODS = gql`
  mutation MyMutation(
    $id: ID!
    $clientMutationId: String!,
    $email1: String = ""
    $firstName1: String = ""
    $lastName1: String = ""
    $address11: String = ""
    $address21: String = ""
    $company1: String = ""
    $city1: String = ""
    $phone1: String = ""
    $state1: String = ""
    $postcode1: String = ""
    $address12: String = ""
    $address22: String = ""
    $city2: String = ""
    $email2: String = ""
    $firstName2: String = ""
    $lastName2: String = ""
    $company2: String = ""
    $phone2: String = ""
    $postcode2: String = ""
    $state2: String = ""
  ) {
    updateCustomer(
      input: {
        billing: {
          email: $email1
          firstName: $firstName1
          lastName: $lastName1
          address1: $address11
          address2: $address21
          city: $city1
          country: IN
          overwrite: true
          phone: $phone1
          postcode: $postcode1
          state: $state1
          company: $company1
        }
        shipping: {
          address1: $address12
          address2: $address22
          city: $city2
          company: $company2
          country: IN
          email: $email2
          firstName: $firstName2
          lastName: $lastName2
          phone: $phone2
          postcode: $postcode2
          state: $state2
          overwrite: true
        }
        shippingSameAsBilling: false
        clientMutationId: $clientMutationId, 
        id: $id
      }
    ) {
      customer {
        billing {
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
        username
        shipping {
          address1
          address2
          city
          company
          email
          country
          firstName
          lastName
          phone
          postcode
          state
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_CUSTOMER_DETAILS = gql`
mutation MyMutation($email: String = "", $firstName: String = "", $id: ID!, $lastName: String = "") {
    updateCustomer(
      input: {email: $email, firstName: $firstName, id: $id, lastName: $lastName}
    ) {
      customer {
        email
        firstName
        lastName
      }
    }
  }
`
