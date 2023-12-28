import { gql } from "@apollo/client";

// what is remaining is adding more than one item to line input

// add a random uuid transaction id and billing details



export const MUTATION_CREATE_ORDER = gql`


  mutation MyMutation(
    $customerId: Int!,
    $transactionId: String!,
    $productList: [LineItemInput]! = {}
  ) {
    createOrder(
      input: {
        clientMutationId: ""
        transactionId: $transactionId
        customerId: $customerId
        lineItems: $productList
        status: YWRAQ_NEW
      }
    ) {
      orderId
      clientMutationId
      order {
        id
        cartHash
        createdVia
        customer {
          id
          firstName
        }
        paymentMethod
        paymentMethodTitle
        status
        total
        cartTax
        totalTax
        shippingTax
        shippingTotal
      }
    }
  }
`;

// data looks something like this

// {
//     "data": {
//       "createOrder": {
//         "orderId": 20891,
//         "clientMutationId": null,
//         "order": {
//       "id": "b3JkZXI6MjA4OTM="
//           "cartHash": null,
//           "createdVia": "graphql-api",
//           "customerIpAddress": "103.139.35.93",
//           "customer": {
//             "id": "Y3VzdG9tZXI6Njg1",
//             "firstName": null
//           },
//           "paymentMethod": null,
//           "paymentMethodTitle": "yith-request-a-quote",
//           "status": "PENDING",
//           "total": "₹550,000.0"
//         }
//       }
//     },
