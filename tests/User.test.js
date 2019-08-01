import "@babel/polyfill";
import { _setMockUserInfo } from "google-auth-library";
import graphQLServerStart from "../server";
import connectToDB, { closeDB } from "../database";
import { getClient } from "./utils/utils";
import { ME, SIGNUP } from "./definitions";
import { userOne, userTwo, initDatabase } from "./dataInit";

let db = null;
let server = null;

beforeAll(async () => {
  db = await connectToDB(true);
  server = await graphQLServerStart(db);
  await initDatabase(db);
});

test("signup", async () => {
  const jimUser = {
    name: "Jim",
    email: "jim@example.com",
    picture: "http://example.com/jim.jpg"
  };
  _setMockUserInfo(jimUser);
  const client = getClient("DummyToken");
  const newUser = await client.mutate({ mutation: SIGNUP });
  console.log(newUser);
  const dbUser = await db.User.findByPk(newUser.data.signUp.id);
  expect(dbUser.dataValues.email).toBe(jimUser.email);
  expect(dbUser.dataValues.picture).toBe(jimUser.picture);
  expect(dbUser.dataValues.name).toBe(jimUser.name);
});
test("signup as an existing user", async () => {
  _setMockUserInfo(userOne.input);
  const client = getClient("DummyToken");
  await expect(client.mutate({ mutation: SIGNUP })).rejects.toThrow(
    /User with email/
  );
});
test("signup twice", async () => {
  const henryUser = {
    name: "Henry",
    email: "henry@example.com",
    picture: "http://example.com/henry.jpg"
  };
  _setMockUserInfo(henryUser);
  const client = getClient("DummyToken");
  const newUser = await client.mutate({ mutation: SIGNUP });
  await expect(client.mutate({ mutation: SIGNUP })).rejects.toThrow(
    /User with email/
  );
});
test("me", async () => {
  _setMockUserInfo(userTwo.input);
  const client = getClient("DummyToken");

  const me_user = await client.query({ query: ME });
  expect(userTwo.input.email).toBe(me_user.data.me.email);
  expect(userTwo.input.picture).toBe(me_user.data.me.picture);
  expect(userTwo.input.name).toBe(me_user.data.me.name);
  expect(userTwo.user.id).toBe(me_user.data.me.id);
});

afterAll(async () => {
  if (!server) return;
  await server.stop(() => {
    console.log("Server closing");
  });
  await closeDB();
});
