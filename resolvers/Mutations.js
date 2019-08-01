import { AuthenticationError } from "apollo-server";
import { getUserInfo, authenticated } from "../controllers";

const Mutation = {
  async signUp(parent, args, { req, db }) {
    const googleUser = await getUserInfo(req);
    const { name, email, picture } = googleUser;
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
      throw new AuthenticationError(`User with email ${email} already exists`);
    }
    return db.User.create({ name, email, picture });
  },
  createPin: authenticated(async (parent, { pin }, { currentUser, db }) => {
    console.log("input", currentUser);
    const { latitude, longitude, title, text, content, dateSpotted } = pin;
    const newPin = await db.Pin.create({
      dateSpotted: dateSpotted,
      content,
      latitude,
      longitude,
      title,
      userId: currentUser.id
    });
    return newPin.dataValues;
  }),
  updatePin: authenticated(
    async (parent, { pinId, pin }, { currentUser, db }) => {
      console.log(pinId, pin);
      const pinToUpdate = await db.Pin.findByPk(pinId);
      if (!pinToUpdate) throw new Error("Pin cannot be found");
      if (pinToUpdate.userId !== currentUser.id) {
        throw new Error("You are not the author of this pin");
      }
      const { latitude, longitude, title, content, dateSpotted } = pin;
      const rowsAffected = await db.Pin.update(
        {
          dateSpotted: dateSpotted ? dateSpotted : pinToUpdate.dateSpotted,
          content: content ? content : pinToUpdate.content,
          latitude: latitude ? latitude : pinToUpdate.latitude,
          longitude: longitude ? longitude : pinToUpdate.longitude,
          title: title ? title : pinToUpdate.title
        },
        { where: { id: pinId } }
      );
      console.log(rowsAffected);
      const updatedPin = await db.Pin.findByPk(pinId);

      return updatedPin.dataValues;
    }
  ),
  deletePin: authenticated(async (parent, { pin }, { db, currentUser }) => {
    const pinToDelete = await db.Pin.findByPk(pin);
    if (!pinToDelete) throw new Error("Pin cannot be found");
    if (pinToDelete.userId !== currentUser.id)
      throw new Error("You must be the author of the pin to delete it");
    const affectedRows = await db.Pin.destroy({ where: { id: pin } });
    console.log(pinToDelete);
    return pinToDelete.dataValues;
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
