import { AuthenticationError } from "apollo-server";
import { getUserInfo, authenticated } from "../controllers";
import {
  SIGHTING_ADDED,
  SIGHTING_UPDATED,
  SIGHTING_DELETED,
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
  createSighting: authenticated(
    async (parent, { sighting }, { currentUser, db, pubsub }) => {
      console.log("inputs", sighting);

      const newSighting = await db.Sighting.create({
        ...sighting,
        userId: currentUser.id
      });
      console.log(newSighting);
      pubsub.publish(SIGHTING_ADDED, { sightingAdded: newSighting.dataValues });
      return newSighting.dataValues;
    }
  ),
  // createSighting: authenticated(
  //   async (parent, { sighting }, { currentUser, db, pubsub }) => {
  //     console.log(sighting);

  //     return "Hello";
  //     // try {
  //     //   const {
  //     //     latitude,
  //     //     longitude,
  //     //     dateSpotted,
  //     //     species,
  //     //     content,
  //     //     countYoung,
  //     //     countAdults,
  //     //     direction,
  //     //     speed,
  //     //     vocalizing,
  //     //     activity,
  //     //     observerInteraction,
  //     //     observerDistance,
  //     //     observerLocation
  //     //   } = sighting;
  //     //   const newSighting = await db.Sighting.create({
  //     //     latitude,
  //     //     longitude,
  //     //     dateSpotted,
  //     //     countYoung,
  //     //     countAdult,
  //     //     species,
  //     //     content,
  //     //     direction,
  //     //     speed,
  //     //     vocalizing,
  //     //     activity,
  //     //     observerInteraction,
  //     //     observerDistance,
  //     //     observerLocation,
  //     //     userId: currentUser.id
  //     //   });
  //     //   pubsub.publish(SIGHTING_ADDED, {
  //     //     sightingAdded: newSighting.dataValues
  //     //   });
  //     //   return newSighting.dataValues;
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   }
  // ),
  updateSighting: authenticated(
    async (parent, { sightingId, sighting }, { currentUser, db, pubsub }) => {
      console.log(sightingId, sighting);
      const sightingToUpdate = await db.Sighting.findByPk(sightingId);
      if (!sightingToUpdate) throw new Error("Sighting cannot be found");
      if (sightingToUpdate.userId !== currentUser.id) {
        throw new Error("You are not the author of this sighting");
      }
      const {
        latitude,
        longitude,
        dateSpotted,
        countYoung,
        countAdult,
        species,
        content,
        direction,
        speed,
        vocalizing,
        activity,
        observerInteraction,
        observerDistance,
        observerLocation
      } = sighting;
      const rowsAffected = await db.Sighting.update(
        {
          dateSpotted: dateSpotted ? dateSpotted : sightingToUpdate.dateSpotted,
          content: content ? content : sightingToUpdate.content,
          latitude: latitude ? latitude : sightingToUpdate.latitude,
          longitude: longitude ? longitude : sightingToUpdate.longitude
        },
        { where: { id: sightingId } }
      );
      console.log(rowsAffected);
      const updatedSighting = await db.Sighting.findByPk(sightingId);
      pubsub.publish(SIGHTING_UPDATED, {
        sightingUpdated: updatedSighting.dataValues
      });

      return updatedSighting.dataValues;
    }
  ),
  deleteSighting: authenticated(
    async (parent, { sighting }, { db, currentUser, pubsub }) => {
      const sightingToDelete = await db.Sighting.findByPk(sighting);
      if (!sightingToDelete) throw new Error("Sighting cannot be found");
      if (sightingToDelete.dataValues.userId !== currentUser.id)
        throw new Error("You must be the author of the sighting to delete it");
      const affectedRows = await db.Sighting.destroy({
        where: { id: sighting }
      });
      pubsub.publish(SIGHTING_DELETED, {
        sightingDeleted: sightingToDelete.dataValues
      });

      return sightingToDelete.dataValues;
    }
  ),

  createComment: authenticated(
    async (parent, { sightingId, text }, { currentUser, db, pubsub }) => {
      const comment = await db.Comment.create({
        text,
        sightingId,
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
    async (
      parent,
      { sightingId, url, isHero },
      { currentUser, db, pubsub }
    ) => {
      const image = await db.Image.create({
        url,
        sightingId,
        userId: currentUser.id,
        isHero: isHero ? true : false
      });
      return image;
    }
  )
};

export { Mutation as default };
