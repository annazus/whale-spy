import ApolloClient from "apollo-boost";
import fetch from "cross-fetch";

export const getClient = token => {
  const client = new ApolloClient({
    fetch,
    uri: `http://${process.env.HOST}:${process.env.PORT}`,
    headers: token ? { authorization: `Bearer ${token}` } : null
  });
  return client;
};
