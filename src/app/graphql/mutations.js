import { gql } from "@apollo/client";

export const MUTATION_UPDATE_USER_PASSWORD = gql`
 mutation MyMutation($id: ID!, $password: String!) {
    updateUser(input: { id: $id, password: $password }) {
      user {
        id
        username
      }
    }
  }
`
export const MUTATION_UPDATE_ROLE= gql`
mutation MyMutation($id: ID!, $roles: [String] = "") {
  updateUser(input: { id: $id, roles: $roles }) {
    user {
      roles {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
`