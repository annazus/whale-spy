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
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.TEXT },
    dateSpotted: { type: Sequelize.DATE, allowNull: false }
  });
  pin.associate = models => {
    pin.belongsTo(models.User);
    pin.hasMany(models.Comment);
    pin.hasMany(models.Image);
  };
  return pin;
};

export { Pin as default };
