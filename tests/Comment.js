import "@babel/polyfill";
import graphqlServerStart from "../server";
import { getClient } from "./utils/utils";
import connectToDB, { closeDB } from "../database";
import { _setMockUserInfo } from "google-auth-library";
import {
  QUERY_COMMENTS,
  QUERY_COMMENTS_WITH_USER_PIN,
  MUTATE_CREATE_COMMENT,
  MUTATE_DELETE_COMMENT
} from "./definitions";
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
beforeAll(async () => {
  db = await connectToDB(true);
  server = await graphqlServerStart(db);
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

  test("query comment", async () => {
    const variables = { pinId: pinOne.pin.id };
    const comments = await client.query({
      query: QUERY_COMMENTS_WITH_USER_PIN,
      variables
    });
    expect(comments.data.comments.length).toBe(2);
    expect(comments.data.comments[0].author.id).toBe(commentOne.comment.userId);
    expect(comments.data.comments[0].pin.id).toBe(commentOne.comment.pinId);
    expect(comments.data.comments[0].author.email).toBe("");
  });

  test(`create a new comment`, async () => {
    const variables = { text: "New Comment", pinId: pinTwo.pin.id };
    const newComment = await client.mutate({
      mutation: MUTATE_CREATE_COMMENT,
      variables
    });
    expect(newComment.data.createComment.text).toBe(variables.text);
    expect(newComment.data.createComment.author.id).toBe(userOne.user.id);
    expect(newComment.data.createComment.pin.id).toBe(pinTwo.pin.id);
  });

  test(`delete a comment`, async () => {
    const variables = { commentId: commentTwo.comment.id };
    const deletedComment = await client.mutate({
      mutation: MUTATE_DELETE_COMMENT,
      variables
    });
    const dbComment = await db.Comment.findByPk(commentTwo.comment.id);
    expect(dbComment).toBeFalsy();
  });
  test(`delete a comment you did not create`, async () => {
    const variables = { commentId: commentOne.comment.id };
    await expect(
      client.mutate({
        mutation: MUTATE_DELETE_COMMENT,
        variables
      })
    ).rejects.toThrow("You must be the author of the comment to delete it");
    const dbComment = await db.Comment.findByPk(commentOne.comment.id);
    expect(dbComment.dataValues.id).toBe(variables.commentId);
  });
});
describe("test comment operations with a user not logged in", () => {
  let client;
  beforeAll(() => {
    client = getClient();
  });
  beforeEach(async () => {
    await initDatabase(db);
  });

  test("query comment", async () => {
    const variables = { pinId: pinOne.pin.id };
    const comments = await client.query({
      query: QUERY_COMMENTS_WITH_USER_PIN,
      variables
    });
    expect(comments.data.comments[0].author.id).toBe(commentOne.comment.userId);
    expect(comments.data.comments[0].pin.id).toBe(commentOne.comment.pinId);
    expect(comments.data.comments[0].author.email).toBe("");
  });

  test(`create a new comment`, async () => {
    const variables = { text: "New Comment", pinId: pinTwo.pin.id };
    await expect(
      client.mutate({
        mutation: MUTATE_CREATE_COMMENT,
        variables
      })
    ).rejects.toThrow(/User has not logged in/);
  });
});
afterAll(async () => {
  if (server) await server.stop();
  if (db) await closeDB();
});
