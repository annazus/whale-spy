import { Sequelize } from "sequelize";

const Sighting = {
  async author({ userId }, args, { req, db }, info) {
    let user = await db.User.findByPk(userId);
    user.email = "";
    return user;
  },
  comments({ id }, args, { req, db }, info) {
    return db.Comment.findAll({ where: { sightingId: id } });
  },
  images({ id }, args, { req, db }, info) {
    return db.Image.findAll({ where: { sightingId: id } });
  }
};
export default Sighting;
