import { OAuth2Client } from "google-auth-library";
import { AuthenticationError } from "apollo-server";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getUserInfo = async req => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AuthenticationError("User has not logged in.");
    console.log("authHeader", authHeader);
    const idToken = authHeader.replace("Bearer ", "");
    console.log("idToken", idToken);
    console.log("CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    console.log(ticket);
    const googleUser = ticket.getPayload();
    if (!googleUser) throw new AuthenticationError("Google returned error");
    return googleUser;
  } catch (error) {
    console.log("Google returning funny", error);
    throw new AuthenticationError("User has not logged in.");
  }
};
const authenticated = next => async (parent, args, ctx, info) => {
  console.log("authenti");
  const { db, req } = ctx;
  const { email, picture, name } = await getUserInfo(req);
  const currentUser = await db.User.findOne({
    where: { email: email }
  });
  if (!currentUser) {
    throw new AuthenticationError(`User with email ${email} does not exist`);
  }
  ctx.currentUser = { email, picture, name, id: currentUser.dataValues.id };
  return next(parent, args, ctx, info);
};
export { getUserInfo, authenticated };
