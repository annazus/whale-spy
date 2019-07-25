const Pin = {
  author({ userId }, args, { request, db }, info) {
    return db.User.findByPk(userId);
  },
  comments({ id }, args, { request, db }, info) {
    return db.Comment.findAll({ where: { pinId: id } });
  },
  pictures({ id }, args, { request, db }, info) {
    return db.Picture.findAll({ where: { pinId: id } });
  }
};
export default Pin;
