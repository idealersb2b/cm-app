import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";


export const MUTATION_REFRESH_AUTH_TOKEN = gql`
  mutation RefreshAuthToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

// export const MUTATION_CREATE_USER = gql`
// mutation registerUser($username: String!, $password: String!, $email: String!) {
//   registerUser(input: {username: $username, password: $password, email: $email}) {
//     clientMutationId
//     user {
//       email
//       firstName
//       id
//     }
//   }
// }`

export const MUTATION_CREATE_USER = gql`
  mutation registerCustomer($username: String!, $password: String!, $email: String!) {
    registerCustomer(input: {password: $password,username: $username,email: $email}
    ) {
      customer {
        email
      }
      clientMutationId
    }
  }
`;


// dXNlcjo2ODQ=
// dXNlcjo2ODU

// type UpdateUserInput

export const MUTATION_SEND_PASSWORD_RESET = gql`
mutation MyMutation($input: SendPasswordResetEmailInput!) {
  sendPasswordResetEmail(input: $input) {
    success
    clientMutationId
  }
}
`

// Note login is the username, key is the part of the email link which the users receive on their registered email
export const MUTATION_RESET_USER_PASSWORD = gql`
mutation MyMutation($login: String = "", $password: String = "", $key: String = "") {
  resetUserPassword(input: { login: $login, password: $password, key: $key }) {
    clientMutationId
      user {
      email
    }
  }
}
`


export const MUTATION_UPDATE_USER = gql`
mutation updateUser {
  updateUser(input: { id: "dXNlcjo2ODQ=", password: "pqrstuv", firstName: "pqrstuv" }) {
      user {
      id
      email
      name
      firstName

    }
  }
}
`

export const MUTATION_DELETE_USER = gql`
mutation deleteUser {
  deleteUser(input: { id: "dXNlcjo2ODQ" }) {
    clientMutationId
    deletedId
      user {
      email
    }
  }
}
`