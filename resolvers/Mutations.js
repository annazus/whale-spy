import { AuthenticationError } from "apollo-server";
import { getUserInfo, authenticated } from "../controllers";

const Mutation = {
  async signUp(parent, args, { req, db }) {
    const googleUser = await getUserInfo(req);
    const { name, email, picture } = googleUser;
    const user = await db.User.findOne({ email });
    if (user) {
      throw new AuthenticationError(`User with email ${email} already exists`);
    }
    return db.User.create({ name, email, picture });
  },
  createPin: authenticated(async (parent, { pin }, { currentUser, db }) => {
    const { dateSpotted, latitude, longitude, title, text } = pin;
    const pinRecord = await db.Pin.create({
      dateSpotted,
      latitude,
      longitude,
      title,
      text,
      userId: currentUser.id
    });
    return pinRecord;
  }),
  createComment: authenticated(
    async (parent, { pinId, text }, { currentUser, db }) => {
      const comment = await db.Comment.create({
        text,
        pinId,
        userId: currentUser.id
      });
      return comment;
    }
  ),
  createImage: authenticated(
    async (parent, { pinId, url, isHero }, { currentUser, db }) => {
      const image = await db.Image.create({
        url,
        pinId,
        userId: currentUser.id,
        isHero: isHero ? true : false
      });
      return image;
    }
  )
};

export { Mutation as default };
