import "@babel/polyfill";
import { _setMockUserInfo } from "google-auth-library";
import connectToDB, { closeDB } from "../database";
import graphQLServerStart from "../server";
import {
  initDatabase,
  userOne,
  userTwo,
  pinOne,
  pinTwo,
  commentOne,
  commentTwo
} from "./dataInit";
import { getClient } from "./utils/utils";
import { CREATE_PIN, DELETE_PIN, UPDATE_PIN } from "./definitions";

let db = null;
let server = null;

beforeAll(async () => {
  db = await connectToDB(true);
  server = await graphQLServerStart(db);
  await initDatabase(db);
});

describe("Query pins with unauthorized user", () => {
  let client;
  beforeAll(() => {
    client = getClient();
  });
  test("query pins", () => {});
});

describe("Test pin mutations with authorized user", () => {
  let client;
  beforeAll(() => {
    _setMockUserInfo(userOne.input);
    client = getClient("DummyToken");
  });

  test("create pin mutation with signed up user", async () => {
    const newPinInput = {
      title: "My new post",
      content: "new post content",
      latitude: 34.3,
      longitude: 34.3,
      dateSpotted: new Date(),
      image:
        "https://res.cloudinary.com/wwooooo/image/upload/v1565305217/Screen_Shot_2019-01-03_at_9.44.57_AM_1_gv1hep.png"
    };
    const variables = {
      title: newPinInput.title,
      content: newPinInput.content,
      latitude: newPinInput.latitude,
      longitude: newPinInput.longitude,
      image: newPinInput.image,
      dateSpotted: newPinInput.dateSpotted.getTime()
    };

    const newPin = await client.mutate({ mutation: CREATE_PIN, variables });
    expect(newPin.data.createPin.title).toBe(newPinInput.title);
    expect(newPin.data.createPin.content).toBe(newPinInput.content);
    expect(newPin.data.createPin.latitude).toBe(newPinInput.latitude);
    expect(newPin.data.createPin.longitude).toBe(newPinInput.longitude);
    expect(newPin.data.createPin.dateSpotted).toBe(
      newPinInput.dateSpotted.getTime()
    );
    expect(newPin.data.createPin.author.id).toBe(userOne.user.id);
  });

  test("delete pin", async () => {
    const variables = {
      pin: pinOne.pin.id
    };
    const deletedPin = await client.mutate({ mutation: DELETE_PIN, variables });
    expect(deletedPin.data.deletePin.id).toBe(pinOne.pin.id);
    expect(deletedPin.data.deletePin.author.id).toBe(userOne.user.id);

    const dbPin = await db.Pin.findByPk(pinOne.pin.id);
    expect(dbPin).toBeFalsy();
  });

  test("update pin", async () => {
    let { latitude, longitude, title, content, dateSpotted, pinId } = {
      ...pinTwo.input,
      pinId: pinTwo.pin.id,
      title: "New Title"
    };

    const variables = {
      latitude,
      longitude,
      title,
      content,
      dateSpotted: dateSpotted.getTime(),
      pinId
    };
    const updatedPin = await client.mutate({ mutation: UPDATE_PIN, variables });
    expect(updatedPin.data.updatePin.title).toBe("New Title");
  });
});

describe("Test pin mutations with unauthorized user", () => {
  let client;
  beforeAll(() => {
    _setMockUserInfo(userTwo.input);
    client = getClient("DummyToken");
  });

  test("delete pin", async () => {
    const variables = {
      pin: pinTwo.pin.id
    };
    await expect(
      client.mutate({ mutation: DELETE_PIN, variables })
    ).rejects.toThrow("You must be the author of the pin to delete it");
  });

  test("update pin", async () => {
    const pinId = pinTwo.pin.id;

    const variables = {
      latitude: 94.0,
      pinId
    };
    await expect(
      client.mutate({ mutation: UPDATE_PIN, variables })
    ).rejects.toThrow("You are not the author of this pin");
  });
});
afterAll(async () => {
  if (!server) return;
  await server.stop(() => {
    console.log("Server closing");
  });
  await closeDB();
});
