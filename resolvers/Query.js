const Query = {
  users(parent, args, { request, db }, info) {
    return db.User.findAll({});
  },
  pins(parent, args, { request, db }, info) {
    return db.Pin.findAll({});
  },
  myPins(parent, args, { request, db }, info) {
    return db.Pin.findAll({});
  },
  comments(parent, { pinId }, { request, db }, info) {
    return db.Comment.findAll({ where: { pinId: pinId } });
  },
  pictures(parent, { pinId }, { request, db }, info) {
    return db.Picture.findAll({ where: { pinId: pinId } });
  }
};

export { Query as default };
