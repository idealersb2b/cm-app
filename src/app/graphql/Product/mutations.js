import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

export const MUTATION_CREATE_PRODUCT = gql`
mutation MyMutation($input: CreateProductInput = {content: "new wind generator", title: "Wind energy generator"}) {
    createProduct(input: $input) {
      clientMutationId
      product {
        id
        name
        productId
        sku
        content
      }
    }
  }
`
// cHJvZHVjdDoyMDg1OA
// cHJvZHVjdDoyMDg1OA== 20858

export const MUTATION_UPDATE_PRODCUT = gql`
mutation MyMutation($input: UpdateProductInput = {id: "20857", title: "Windmill"}) {
    updateProduct(input: $input) {
      product {
        id
        name
      }
    }
  }
`

// cHJvZHVjdDoyMDg1Nw==

export const MUTATION_DELETE_PRODCUT = gql`
mutation MyMutation($input: DeleteProductInput = {id: "cHJvZHVjdDoyMDg1Nw=="}) {
  
    deleteProduct(input: $input ) {
      deletedId
      product {
        id
        name
      }
    }
  }
 `



