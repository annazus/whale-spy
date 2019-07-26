import { Sequelize } from "sequelize";

const Pin = {
  async author({ userId }, args, { req, db }, info) {
    let user = await db.User.findByPk(userId);
    user.email = "";
    return user;
  },
  comments({ id }, args, { req, db }, info) {
    return db.Comment.findAll({ where: { pinId: id } });
  },
  images({ id }, args, { req, db }, info) {
    return db.Image.findAll({ where: { pinId: id } });
  }
};
export default Pin;
