import { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";

export const GRAPHQL_SERVER_URL = `http://${process.env.REACT_APP_HOST}:${
  process.env.REACT_APP_PORT
}`;

export const useAuthenticatedClient = () => {
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const { id_token } = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse();
    setIdToken(id_token);
  }, []);

  return new ApolloClient({
    uri: GRAPHQL_SERVER_URL,
    headers: idToken ? { authorization: `Bearer ${idToken}` } : null
  });
};

export const getClient = idToken => {
  return new ApolloClient({
    uri: GRAPHQL_SERVER_URL,
    headers: idToken ? { authorization: `Bearer ${idToken}` } : null
  });
};
