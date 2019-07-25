import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import db from "./database";
import { Mutation, Query, Date, Pin } from "./resolvers";

const typeDefs = gql`
  ${fs.readFileSync("./schema.graphql", "utf8")}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: { Mutation, Query, Date, Pin },
  context: ({ request }) => {
    return { request, db };
  }
});

server.listen().then(({ url }) => console.log(`Server started at ${url}`));
