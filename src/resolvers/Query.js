import { getUserInfo, authenticated } from "../controllers";

const Query = {
  //   users(parent, args, { request, db }, info) {
  //     return db.User.findAll({});
  //   },
  me: authenticated((parent, args, ctx, info) => {
    const { db, currentUser } = ctx;
    return db.User.findByPk(currentUser.id);
  }),
  sightings: async (parent, args, { db }, info) => {
    const data = await db.Sighting.findAll({});
    return data;
  },
  mySightings(parent, args, { req, db }, info) {
    return db.Sighting.findAll({});
  },
  comments: (parent, { sightingId }, { db }, info) => {
    return db.Comment.findAll({ where: { sightingId: sightingId } });
  }
  //   images(parent, { sightingId }, { request, db }, info) {
  //     return db.Image.findAll({ where: { sightingId: sightingId } });
  //   }
};

export { Query as default };
