import Sequelize from "sequelize";

const Image = connection => {
  const image = connection.define("picture", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    url: { type: Sequelize.STRING, allowNull: false, unique: true },
    isHero: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
  });

  image.associate = models => {
    image.belongsTo(models.Pin);
  };

  return image;
};

export { Image as default };