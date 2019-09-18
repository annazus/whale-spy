import Sequelize from "sequelize";

const Sighting = connection => {
  const sighting = connection.define("sighting", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    latitude: { type: Sequelize.FLOAT, allowNull: false },
    longitude: { type: Sequelize.FLOAT, allowNull: false },
    dateSpotted: { type: Sequelize.DATE, allowNull: false },
    species: {
      type: Sequelize.ENUM("ORCA", "GRAY", "MINKE", "HUMPBACK", "UNKNOWN"),
      allowNull: false
    },
    countAdults: {
      type: Sequelize.ENUM("0", "1", "2", "3", "4", "5", "6", "7+"),
      allowNull: true
    },
    countYoung: {
      type: Sequelize.ENUM("0", "1", "2", "3", "4", "5", "6", "7+"),
      allowNull: true
    },
    direction: {
      type: Sequelize.ENUM("Unknown", "N", "S", "E", "W"),
      allowNull: true
    },
    speed: {
      type: Sequelize.ENUM("Stationary", "Slow", "Fast"),
      allowNull: true
    },
    content: { type: Sequelize.TEXT, allowNull: true },
    vocalizing: { type: Sequelize.BOOLEAN, allowNull: true },
    activity: {
      type: Sequelize.ENUM(
        "Breaching",
        "Feeding",
        "Hunting",
        "Sleeping",
        "Playing",
        "Spyhopping"
      ),
      allowNull: true
    },
    interactionWithObservers: {
      type: Sequelize.ENUM(
        "Approached observers",
        "Appeared interested in observers",
        "Moved away"
      ),
      allowNull: true
    },
    observerLocation: {
      type: Sequelize.ENUM("Water", "Land", "Air"),
      allowNull: true
    },
    observerDistance: {
      type: Sequelize.ENUM(
        "<100 meters",
        "100 meters",
        "200 meters",
        "1 mile",
        "> 1 mile"
      ),
      allowNull: true
    }
  });
  sighting.associate = models => {
    sighting.belongsTo(models.User);
    sighting.hasMany(models.Comment);
    sighting.hasMany(models.Image);
  };
  return sighting;
};

export { Sighting as default };
