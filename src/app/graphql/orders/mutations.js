import { gql } from "@apollo/client";

export const MUTATION_CREATE_ORDER = gql`
  mutation MyMutation(
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
    $customerId: Int!,
    $transactionId: String!,
    $productList: [LineItemInput]! = {}
  ) {
    createOrder(
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
        transactionId: $transactionId
        customerId: $customerId
        lineItems: $productList
        status: YWRAQ_NEW
      }
    ) {
      orderId
      clientMutationId
      order {
        cartHash
        createdVia
        customer {
          id
          firstName
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
        }
        paymentMethod
        paymentMethodTitle
        status
        total
        cartTax
        totalTax
        shippingTax
        shippingTotal
        shipping {
          address1
          address2
          company
          city
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
  }
`;
