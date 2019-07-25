import Sequelize from "sequelize";

const User = connection => {
  const user = connection.define("user", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false }
  });
  user.associate = models => {
    user.hasMany(models.Pin);
    user.hasMany(models.Comment);
  };
  return user;
};
export default User;
