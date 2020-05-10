import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";


const PORT = process.env.REACT_APP_PORT
console.log(PORT);
 

const httpLink = createHttpLink({
    uri: "/graphql",
});

const wsLink = new WebSocketLink({
    uri: `ws://node-react-messenger.herokuapp.com:${PORT}/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem("authToken"),
        },
    },
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("authToken");
    return {
        headers: {
            ...headers,
            token,
        },
    };
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    },
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
