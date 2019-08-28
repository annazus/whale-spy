import { AuthenticationError } from "apollo-server";
import { getUserInfo, authenticated } from "../controllers";
import {
  PIN_ADDED,
  PIN_UPDATED,
  PIN_DELETED,
  COMMENT_ADDED
} from "./SubscriptionTypes";
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
  createPin: authenticated(
    async (parent, { pin }, { currentUser, db, pubsub }) => {
      const { latitude, longitude, title, image, content, dateSpotted } = pin;
      const newPin = await db.Pin.create({
        dateSpotted: dateSpotted,
        content,
        latitude,
        longitude,
        title,
        image,
        userId: currentUser.id
      });
      console.log(newPin.dataValues);
      pubsub.publish(PIN_ADDED, { pinAdded: newPin.dataValues });
      return newPin.dataValues;
    }
  ),
  updatePin: authenticated(
    async (parent, { pinId, pin }, { currentUser, db, pubsub }) => {
      console.log(pinId, pin);
      const pinToUpdate = await db.Pin.findByPk(pinId);
      if (!pinToUpdate) throw new Error("Pin cannot be found");
      if (pinToUpdate.userId !== currentUser.id) {
        throw new Error("You are not the author of this pin");
      }
      const { latitude, longitude, title, content, dateSpotted, image } = pin;
      const rowsAffected = await db.Pin.update(
        {
          dateSpotted: dateSpotted ? dateSpotted : pinToUpdate.dateSpotted,
          content: content ? content : pinToUpdate.content,
          latitude: latitude ? latitude : pinToUpdate.latitude,
          longitude: longitude ? longitude : pinToUpdate.longitude,
          title: title ? title : pinToUpdate.title,
          image: image ? image : pinToUpdate.image
        },
        { where: { id: pinId } }
      );
      console.log(rowsAffected);
      const updatedPin = await db.Pin.findByPk(pinId);
      pubsub.publish(PIN_UPDATED, { pinUpdated: updatedPin.dataValues });

      return updatedPin.dataValues;
    }
  ),
  deletePin: authenticated(
    async (parent, { pin }, { db, currentUser, pubsub }) => {
      const pinToDelete = await db.Pin.findByPk(pin);
      if (!pinToDelete) throw new Error("Pin cannot be found");
      if (pinToDelete.dataValues.userId !== currentUser.id)
        throw new Error("You must be the author of the pin to delete it");
      const affectedRows = await db.Pin.destroy({ where: { id: pin } });
      pubsub.publish(PIN_DELETED, { pinDeleted: pinToDelete.dataValues });

      return pinToDelete.dataValues;
    }
  ),

  createComment: authenticated(
    async (parent, { pinId, text }, { currentUser, db, pubsub }) => {
      const comment = await db.Comment.create({
        text,
        pinId,
        userId: currentUser.id
      });

      pubsub.publish(COMMENT_ADDED, { commentAdded: comment.dataValues });
      return comment.dataValues;
    }
  ),
  deleteComment: authenticated(
    async (parent, { commentId }, { db, currentUser, pubsub }) => {
      const commentToDelete = await db.Comment.findByPk(commentId);
      if (!commentToDelete) throw new Error("Comment cannot be found");
      if (commentToDelete.dataValues.userId !== currentUser.id)
        throw new Error("You must be the author of the comment to delete it");
      const affectedRows = await db.Comment.destroy({
        where: { id: commentId }
      });

      return commentToDelete.dataValues;
    }
  ),
  createImage: authenticated(
    async (parent, { pinId, url, isHero }, { currentUser, db, pubsub }) => {
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
