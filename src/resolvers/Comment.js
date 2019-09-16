const Comment = {
  async author({ userId }, args, { req, db }, info) {
    let user = await db.User.findByPk(userId);
    user.email = "";
    return user;
  },
  sighting({ sightingId }, args, { req, db }, info) {
    return db.Sighting.findByPk(sightingId);
  }
};
export default Comment;
