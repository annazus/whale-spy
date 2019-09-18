import { useState, useEffect } from "react";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
//

import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

export const GRAPHQL_SERVER_URL = process.env.REACT_APP_GRAPHQL_URL;
export const GRAPHQL_SUBSERVER_URL = process.env.REACT_APP_GRAPHQL_WS_URL;

const httpLink = new createHttpLink({
  uri: GRAPHQL_SERVER_URL // use https for secure endpoint
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_SUBSERVER_URL,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
export const subServerClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export const useAuthenticatedClient = () => {
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const { id_token } = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse();
    setIdToken(id_token);
  }, []);

  const cache = new InMemoryCache();
  const link = new createHttpLink({
    uri: GRAPHQL_SERVER_URL,
    headers: idToken ? { authorization: `Bearer ${idToken}` } : null
  });

  return new ApolloClient({
    link: link,
    cache: cache
  });
};

export const getClient = idToken => {
  const cache = new InMemoryCache();
  const link = new createHttpLink({
    uri: GRAPHQL_SERVER_URL,
    headers: idToken ? { authorization: `Bearer ${idToken}` } : null
  });

  return new ApolloClient({
    link: link,
    cache: cache,
    onError: e => console.log("GRAPHQL ERROR", e)
  });
};
