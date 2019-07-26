const Comment = {
  async author({ userId }, args, { req, db }, info) {
    let user = await db.User.findByPk(userId);
    user.email = "";
    return user;
  }
};
export default Comment;
