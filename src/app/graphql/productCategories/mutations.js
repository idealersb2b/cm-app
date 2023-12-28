


export const MUTATION_CREATE_PRODUCT_CATEGORY = gql`
mutation MyMutation($input1: CreateProductCategoryInput = {name: "Wind Energy"}) {
    createProductCategory(input: $input1) {
      productCategory {
        link
      }
    }
  }
`