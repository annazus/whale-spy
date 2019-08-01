require("@babel/polyfill");
const connectToDB = require("../../database").default;

const graphQLServerStart = require("../../server").default;
module.exports = async () => {
  const db = await connectToDB(true);
  const server = await graphQLServerStart(db);
  global.httpServer = server;
};
