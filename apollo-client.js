import { ApolloClient, InMemoryCache, } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://dev.cleantech-mart.com/graphql",
    // uri: "https://cleantech-mart.in/graphql",
    cache: new InMemoryCache()
})

export default client