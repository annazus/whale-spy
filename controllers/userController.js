import { OAuth2Client } from "google-auth-library";
import { AuthenticationError } from "apollo-server";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getUserInfo = async req => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader.replace("Bearer ", "");
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const googleUser = ticket.getPayload();
    return googleUser;
  } catch (error) {
    console.log(error);
    throw new AuthenticationError(error.messsage);
  }
};
const authenticated = next => async (parent, args, ctx, info) => {
  const { db, req } = ctx;
  const { email } = getUserInfo(req);

  const currentUser = await db.User.findOne({ email });
  if (!currentUser) {
    throw new AuthenticationError(`User with email ${email} does not exist`);
  }
  ctx.currentUser = currentUser;
  return next(parent, args, ctx, info);
};
export { getUserInfo, authenticated };
