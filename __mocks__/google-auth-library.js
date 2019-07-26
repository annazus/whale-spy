let mockUserInfo = null;
export const _setMockUserInfo = newUserInfo => {
  mockUserInfo = newUserInfo;
};
export const ticket = jest.fn(() => {
  return {
    getPayload: jest.fn(() => {
      return mockUserInfo;
    })
  };
});
export const OAuth2Client = jest.fn(() => {
  return {
    verifyIdToken: ticket
  };
});
