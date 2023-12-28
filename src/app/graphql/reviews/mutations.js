import { gql } from "@apollo/client";

// export const MUTATION_ADD_REVIEW = gql`
//   mutation MyMutation($rating: Int!, $content: String!, $commentOn: Int!) {
//     writeReview(input: { rating: $rating, content: $content, commentOn: $commentOn }) {
//       clientMutationId
//       rating
//       review {
//         id
//       }
//     }
//   }
// `;

export const MUTATION_ADD_REVIEW = gql`
 mutation MyMutation($rating: Int!, $content: String!, $commentOn: Int!) {
  writeReview(input: { rating: $rating, content: $content, commentOn: $commentOn }) {
      clientMutationId
      rating
      review {
        id
        author {
          node {
            name
            id
          }
        }
        approved
      }
    }
  } 
`


// Y29tbWVudDoyMDE

export const MUTATION_UPDATE_REVIEW = gql`
mutation MyMutation($input1: UpdateReviewInput = {id: "Y29tbWVudDoyMDI", rating: 4, content: "SLEEK Design", commentOn: 20727}) {
    updateReview(input: $input1) {
      clientMutationId
      rating
      review {
        id
        content
      }
    }
  }
`

export const MUTATION_DELETE_REVIEWW = gql`
mutation MyMutation($input1: DeleteReviewInput = {id: "Y29tbWVudDoyMDI"}) {
    deleteReview(input: $input1) {
      affectedId
      rating
      clientMutationId
    }
  }
`