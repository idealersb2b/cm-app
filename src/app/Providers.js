"use client"

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import { MUTATION_REFRESH_AUTH_TOKEN } from "./graphql/users/mutations";
import { parseCookies, setCookie } from "nookies";

import { GraphQLClient } from 'graphql-request'
import cookieCutter from 'cookie-cutter'
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { useEffect } from "react";

export const isLoggedInVar = new InMemoryCache().makeVar(false);
export const isDashboardInVar = new InMemoryCache().makeVar(false);
export const isVendorInVar = new InMemoryCache().makeVar(false);
export const UsernameInVar = new InMemoryCache().makeVar("");


export const Providers = ({ children }) => {

    const httpLink = createHttpLink({
        uri: "https://dev.cleantech-mart.com/graphql",
        credentials: "same-origin"
    });

    const authLink = setContext(async ({ context: { headers: currentHeaders } = {} }) => {

        const headers = { ...currentHeaders };

        const authToken = await getNewAuthToken();

        const sessionToken = localStorage.getItem('woocommerce_session_token')

        if (authToken) {
            headers.Authorization = `Bearer ${authToken}`;
        }

        if (sessionToken) {
            headers['woocommerce-session'] = `Session ${sessionToken}`;
        }

        if (authToken || sessionToken) {
            return { headers };
        }

        return {};

    });



    const getNewAuthToken = async () => {
        const authToken = parseCookies()['authToken'];

        if (authToken) {
            return authToken;
        }

        const refreshToken = parseCookies()['refreshToken'];

        if (!refreshToken) {
            return;
        }

        try {
            const graphQLClient = new GraphQLClient("https://dev.cleantech-mart.com/graphql");
            const results = await graphQLClient.request(MUTATION_REFRESH_AUTH_TOKEN, { refreshToken });

            const newAuthToken = results.refreshJwtAuthToken.authToken;

            // Set the new authentication token as a cookie
            setCookie(null, 'authToken', newAuthToken, {
                path: '/',
                maxAge: 5 * 60, // Set the desired expiration time
            });

            return newAuthToken;
        } catch (error) {
            // Handle any GraphQL request errors here
            console.error("Error refreshing auth token:", error);
            return;
        }
    };


    const client = new ApolloClient({
        link: from([authLink, httpLink]),
        cache: new InMemoryCache(),
    });

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');

        console.log("AuthToken", authToken);

        const isLoggedInInitially = !!authToken;
        isLoggedInVar(isLoggedInInitially);
        UsernameInVar(userName);
        isVendorInVar(userRole === 'wcfm_vendor')

    }, [])


    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}