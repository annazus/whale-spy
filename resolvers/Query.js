import { getUserInfo, authenticated } from "../controllers";

const Query = {
  //   users(parent, args, { request, db }, info) {
  //     return db.User.findAll({});
  //   },
  me: authenticated((parent, args, ctx, info) => {
    const { db, currentUser } = ctx;
    return db.User.findByPk(currentUser.id);
  }),
  pins(parent, args, { db }, info) {
    return db.Pin.findAll({});
  },
  myPins(parent, args, { req, db }, info) {
    return db.Pin.findAll({});
  }
  //   comments(parent, { pinId }, { request, db }, info) {
  //     return db.Comment.findAll({ where: { pinId: pinId } });
  //   },
  //   images(parent, { pinId }, { request, db }, info) {
  //     return db.Image.findAll({ where: { pinId: pinId } });
  //   }
};

export { Query as default };
