import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import * as resolvers from "./resolvers";

const GraphQLServerStart = async db => {
  const typeDefs = gql`
    ${fs.readFileSync("./schema.graphql", "utf8")}
  `;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { req, db };
    }
  });
  server
    .listen({ port: process.env.PORT, host: process.env.HOST })
    .then(({ url }) => console.log(`Server started at ${url}`));
  return server;
};
export { GraphQLServerStart as default };
