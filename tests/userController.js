import "@babel/polyfill";

import { getUserInfo } from "../controllers";
import { OAuth2Client, ticket, _setMockUserInfo } from "google-auth-library";
beforeEach(() => {
  _setMockUserInfo({ email: "ellie" });
});
test("getUserInfo calls with google client id ", async () => {
  const dummyToken = "Dummy";
  const userInfo = await getUserInfo({
    headers: { authorization: `Bearer ${dummyToken}` }
  });
  expect(userInfo.email).toBe("ellie");

  expect(OAuth2Client.mock.calls[0][0]).toBe(process.env.GOOGLE_CLIENT_ID);
  expect(ticket).toHaveBeenCalledTimes(1);
  expect(ticket.mock.calls[0][0]).toStrictEqual({
    idToken: dummyToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  expect(OAuth2Client).toHaveBeenCalledTimes(1);
});
