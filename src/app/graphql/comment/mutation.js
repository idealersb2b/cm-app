




//       "message": "The ID of the node to comment on is invalid",


export const MUTATION_CREATE_COMMENT = gql`
mutation MyMutation($input: CreateCommentInput = {author: "Vignesh", commentOn: 20858, content: "This is an nice product"}) {
    createComment(input: $input) {
      clientMutationId
      comment {
        approved
        author {
          node {
            name
            id
          }
        }
        status
      }
      success
    }
  }
`