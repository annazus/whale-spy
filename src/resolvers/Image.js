const Image = {
  sighting({ sightingId }, args, { req, db }, info) {
    return db.Sighting.findByPk(sightingId);
  }
};
export default Image;
