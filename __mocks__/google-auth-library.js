let mockUserInfo = null;
const _setMockUserInfo = newUserInfo => {
  mockUserInfo = newUserInfo;
};
const ticket = jest.fn(() => {
  return {
    getPayload: jest.fn(() => {
      console.log("MOCKED CALLw");
      return mockUserInfo;
    })
  };
});
const OAuth2Client = jest.fn(() => {
  return {
    verifyIdToken: ticket
  };
});
module.exports = {
  _setMockUserInfo,
  ticket,
  OAuth2Client
};
