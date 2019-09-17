import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import * as resolvers from "./resolvers";

const GraphQLServerStart = async (db, pubsub) => {
  const typeDefs = gql`
    ${fs.readFileSync("src/schema.graphql", "utf8")}
  `;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req, connection }) => {
      if (req) return { req, db, pubsub };
      else return { db, pubsub };
    }
  });
  server
    .listen({ port: process.env.PORT, host: process.env.HOST })
    .then(({ url }) => console.log(`Server started at ${url}`));
  return server;
};
export { GraphQLServerStart as default };
