const Mutation = {
  signUp(parent, { name, email }, { request, db }, info) {
    return db.User.create({ name, email, password: "sdf" });
  },
  async createPin(parent, { pin }, { request, db }, info) {
    const user = await db.User.findOne({
      where: { email: "a@a.a" },
      attributes: ["id"]
    });
    const { dateSpotted, latitude, longitude, title, text } = pin;
    const pinRecord = await db.Pin.create({
      dateSpotted,
      latitude,
      longitude,
      title,
      text,
      userId: user.id
    });
    return pinRecord;
  },
  async createComment(parent, { pinId, text }, { request, db }, info) {
    const user = await db.User.findOne({
      where: { email: "a@a.a" },
      attributes: ["id"]
    });
    const comment = await db.Comment.create({
      text,
      pinId,
      userId: user.id
    });
    return comment;
  },
  async createPicture(parent, { pinId, url, isHero }, { request, db }, info) {
    const user = await db.User.findOne({
      where: { email: "a@a.a" },
      attributes: ["id"]
    });
    const picture = await db.Picture.create({
      url,
      pinId,
      userId: user.id,
      isHero: isHero ? true : false
    });
    return picture;
  }
};
export { Mutation as default };
