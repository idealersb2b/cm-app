
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";


export const QUERY_GET_PRODUCT_CATEGORY = gql`
query MyQuery($productId: ID!) {
    productCategory(id: $productId) {
      id
      name
      count
      link
      parentId
      display
      image {
        link
      }
      slug
      children {
        edges {
          node {
            name
            count
            description
            id
            parentId
            image {
              link
            }
          }
        }
      }
      products(first: 12) {
        edges {
          node {
            name
            ... on SimpleProduct {
              price
            }
            ... on VariableProduct{
              price
            }
            image {
              link
            }
            sku
            id
            productId
          }
        }
      }
    }
  }
`

export const QUERY_GET_PRODUCT_CATEGORIES_AND_THEIR_CHILDREN = gql`
query MyQuery {
    productCategories(first: 500) {
      edges {
        node {
          id
          name
          uri
          count
          description
          display
          image {
            link
          }
          productCategoryId
          parentId
          parent {
            node {
              name
            }
          }
          children(first: 100) {
            edges {
              node {
                name
                id
                parentId
                slug
                uri
              }
            }
          }
        }
      }
    }
  }
`

export const HOMEPAGE_PRODUCT_CATEOGORIES_PRODUCTS = gql`
query MyQuery {
    productCategories(where: {parent: 0}) {
      edges {
        node {
          id
          name
          uri
          slug
          products(first: 12) {
            edges {
              node {
                name
                title
                id
                databaseId
                image {
                  link
                  srcSet
                }
                ... on SimpleProduct {
                  price
                }
                ... on VariableProduct {
                  price
                }
              }
            }
          }
        }
      }
    }
  }
`


export const QUERY_GET_PARENT_PRODUCT_CATEGORIES = gql`
query getProductCategories {
    productCategories(
      first: 20
      where: { parent: 0}
    ) {
      edges {
        node {
          id
          name
          uri
          count
          display
          image {
            link
          }
        }
      }
    }
  }
`

//All Services
export const QUERY_GET_SERVICES = gql`
query MyQuery {
  productCategories(first: 100, where: {nameLike: "services"}) {
    edges {
      node {
        id
        name
        slug
        uri
        count
        children(first: 100) {
          edges {
            node {
              id
              name
              uri
              slug
              count
              image {
                link
              }
              description
            }
          }
        }
      }
    }
  }
}`


export const QUERY_GET_MORE_PRODUCT_CATEGORY = gql`
query MyQuery($productId: ID!) {
    productCategory(id: $productId) {
      id
      name
      count
      link
      parentId
      display
          image {
            link
          }
    
      slug
      children {
        edges {
          node {
            name
            count
            description
            id
            parentId
            image {
                link
              }
          }
        }
      }
      products(first: 20) {
      edges {
        node {
          id
          name
          sku
          averageRating
          featured
          image {
            link
          }
          onSale
          productId
          status
          productTags {
            edges {
              node {
                name
              }
            }
          }
          ... on SimpleProduct {
            price
          }
        }
      }
    }
      
    }
  }
`

export const QUERY_GET_FILTER_PRODUCT_CATEGORY = gql`
query MyQuery($id: ID!, $maxPrice: Float = 1000000000, $minPrice: Float = 0, $order: OrderEnum!, $search: String = "", $field: ProductsOrderByEnum = DATE,$after:String) {
  productCategory(id: $id) {
      id
      name
      count
      ancestors {
              edges {
                node {
                  id
                  name
                }
              }
            }
      link
      parentId
      display
      image {
        link
      }
      uri
      slug
      children {
        edges {
          node {
            name
            count
            description
            id
            parentId
            image {
              link
            }
            slug
            uri
            
          }
        }
      }
      products(
        first: 12
        where: {attribute: "", attributeTerm: "", maxPrice: $maxPrice, minPrice: $minPrice, orderby: {order: $order, field: $field}, search: $search}
        after: $after
      ) {
        edges {
          node {
            name
            ... on SimpleProduct {
              price
            }
            ... on VariableProduct {
              price
            }
            image {
              link
            }
            sku
            id
            productId
            uri
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
        }
      }
    }
  }
`


export const QUERY_GET_PRODUCT_CATEGORIES_BASED_ON_SEARCH_DROPDOWN = gql`
query getProductCategories($search: String!) {
    productCategories(first: 5, where: {search: $search}) {
      edges {
        node {
          id
          name
          uri
          slug
        }
      }
    }
  }
`

export const QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN = gql`
query getProductCategories {
    productCategories(
      first: 20
      where: { parent: 0}
    ) {
      edges {
        node {
          id
          name
          children(first: 7, where: {orderby: COUNT, order: DESC}) {
        edges {
          node {
            name
            id
            children(first: 7, where: {order: DESC, orderby: COUNT}) {
              edges {
                node {
                  name
                  id
                  children(where: {orderby: COUNT, order: DESC}, first: 7) {
                    edges {
                      node {
                        name
                        id
                        children(first: 7, where: {order: DESC, orderby: COUNT}) {
                          edges {
                            node {
                              id
                              name
                              children(first: 7, where: {order: DESC, orderby: COUNT}) {
                                edges {
                                  node {
                                    id
                                    name
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
        }
      }
    }
  }`

export const QUERY_GET_SERVICE = gql`
query MyQuery($id: ID = "dGVybToxOTU" $after: String = "") {
    productCategory(id: $id) {
      id
      name
      count
      link
      parentId
      display
      ancestors {
              edges {
                node {
                  id
                  name
                }
              }
            }
      image {
        link
      }
      slug
      children {
        edges {
          node {
            name
            count
            description
            id
            parentId
            image {
              link
            }
          }
        }
      }
      products(
        first: 12
        after: $after
      ) {
        edges {
          node {
            name
            image {
              link
            }
            sku
            id
            productId
            uri
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
        }
      }
    }
  }
`