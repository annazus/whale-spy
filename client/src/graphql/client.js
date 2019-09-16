import { useState, useEffect } from "react";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
//

import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

export const GRAPHQL_SERVER_URL = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
// export const GRAPHQL_SERVER_URL = `https://${process.env.REACT_APP_HOST}`;
export const GRAPHQL_SUBSERVER_URL = `ws://${process.env.REACT_APP_HOST}:4000/graphql`;

// export const GRAPHQL_SUBSERVER_URL = `wss://${
//   process.env.REACT_APP_HOST
// }/graphql`;

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
  console.log("GRAPHQL_SERVER_URL", GRAPHQL_SERVER_URL);

  return new ApolloClient({
    link: link,
    cache: cache,
    onError: e => console.log("GRAPHQL ERROR", e)
  });
};
