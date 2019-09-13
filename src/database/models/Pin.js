import Sequelize from "sequelize";

const Pin = connection => {
  const pin = connection.define("pin", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    latitude: { type: Sequelize.FLOAT, allowNull: false },
    longitude: { type: Sequelize.FLOAT, allowNull: false },
    dateSpotted: { type: Sequelize.DATE, allowNull: false },
    whaleType: {
      type: Sequelize.ENUM("ORCA", "GRAY", "MINK", "UNKNOWN"),
      allowNull: false
    },
    countAdults: {
      type: Sequelize.ENUM("0", "1", "2", "3", "4", "5", "6", "7+"),
      allowNull: false
    },
    countYoung: {
      type: Sequelize.ENUM("0", "1", "2", "3", "4", "5", "6", "7+"),
      allowNull: false
    },
    directionOfTravel: {
      type: Sequelize.ENUM("UNKNOWN", "NORTH", "SOUTH", "EAST", "WEST"),
      allowNull: false
    },
    speedOfTravel: {
      type: Sequelize.ENUM("STATIONARY", "SLOW", "FAST"),
      allowNull: true
    },
    content: { type: Sequelize.TEXT },
    image: { type: Sequelize.TEXT },
    distanceFromWhales: {
      type: Sequelize.ENUM("1 mile", "1", "2", "3", "4", "5", "6", "7+"),
      allowNull: true
    },
    observerLocation: {
      type: Sequelize.ENUM("Water", "Land", "Air"),
      allowNull: true
    },
    whaleReaction: {
      type: Sequelize.ENUM("Water", "Land", "Air"),
      allowNull: false
    }
  });
  pin.associate = models => {
    pin.belongsTo(models.User);
    pin.hasMany(models.Comment);
    // pin.hasMany(models.Image);
  };
  return pin;
};

export { Pin as default };
