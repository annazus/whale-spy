import "@babel/polyfill";
import graphqlServerStart from "../server";
import { getClient } from "./utils/utils";
import connectToDB, { closeDB } from "../database";
import { _setMockUserInfo } from "google-auth-library";

import {
  initDatabase,
  userOne,
  userTwo,
  pinOne,
  pinTwo,
  commentOne,
  commentTwo
} from "./dataInit";

let server;
let db;
let token = "DUMMYTOKENFORMOCKING";
beforeAll(() => {
  db = connectToDB(true);
  server = graphqlServerStart(db);
});

describe("test comment operations with an authenticated user", () => {
  let client;
  beforeAll(() => {
    _setMockUserInfo(userOne.input);
    client = getClient(token);
  });
  beforeEach(async () => {
    await initDatabase(db);
  });

  test(`query comment`, async () => {
    const comments = client.query();
  });

  test(`create a new comment`, async () => {});
});
describe("test comment operations with a user not logged in", () => {});
afterAll(() => {
  if (server) server.stop();
  if (db) closeDB();
});
