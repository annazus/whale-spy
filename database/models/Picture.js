import Sequelize from "sequelize";

const Picture = connection => {
  const picture = connection.define("picture", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    url: { type: Sequelize.STRING, allowNull: false, unique: true },
    isHero: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
  });

  picture.associate = models => {
    picture.belongsTo(models.Pin);
  };

  return picture;
};

export { Picture as default };
