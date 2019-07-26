import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import db from "./database";
// import { Mutation, Query, Date, Pin } from "./resolvers";
import * as resolvers from "./resolvers";

// import getUserInfo from "./utils/getUserInfo";

// getUserInfo(
//   "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0ZjI5NGM0NTE2MDA4OGQwNzlmZWU2ODEzOGY1MjEzM2QzZTIyOGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDU2NjIzNTc1Mzc2LXJhcWQwbzVhZmdydmxpMTZiNDlocWcybTJkMThzZjk4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDU2NjIzNTc1Mzc2LXJhcWQwbzVhZmdydmxpMTZiNDlocWcybTJkMThzZjk4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTE1NjI1MzAwOTE1MzMyNzY1IiwiZW1haWwiOiJrbXN1emFubmFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJydDNDN3RYRDY1S2hLZHZnMGZuMXVBIiwibmFtZSI6InN1emFubmEga20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1PWVM2ektyQjRqNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JjSUJsUWItaGtGMy1JT3VmSDNGUk5BTkV1RDNBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJzdXphbm5hIiwiZmFtaWx5X25hbWUiOiJrbSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTY0MDcxMTk2LCJleHAiOjE1NjQwNzQ3OTYsImp0aSI6IjFhMWYzZTNkNjgyZjMyZTEzYzRlMTY0OGQxOTczOWJiMDlhNzUxYWIifQ.Iii-VIppMBzXjTtq7rPB1slGccaX1ybmMkWrXXp6AuEADBvQdJrR9HYoLJjWnl0CWnjOjOwVgDz8T9hinBlXxbU9Grn7xOwD74hZe8DBLm__629D-ML-HRnjF54QH2R2kKP2QHmjbfq5mpBUeDsEhqFn3mOK6tYI0JRsEup8Nm_0BEN2HjWlaTl3uQWjgXDgI31x39aCB0cgUzNcvZY-ktkyqpHfsoUTNw2LxKQybKGIbWIxBaPwu-0NigqiQtzi4sDspzzE1qGsHEzEbMewiKXFeDxwpBPxievY2kmooTbG828e_76n2A73f5TwPOLLF2eHBVeb3Iew6Kb7pogTZg"
// ).then(res => console.log(res), err => console.log(err));

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

server.listen().then(({ url }) => console.log(`Server started at ${url}`));
