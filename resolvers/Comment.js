const Comment = {
  async author({ userId }, args, { req, db }, info) {
    let user = await db.User.findByPk(userId);
    user.email = "";
    return user;
  },
  pin({ pinId }, args, { req, db }, info) {
    return db.Pin.findByPk(pinId);
  }
};
export default Comment;
