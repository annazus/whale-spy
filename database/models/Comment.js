import Sequelize from "sequelize";

const Comment = connection => {
  const comment = connection.define("comment", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    text: { type: Sequelize.TEXT }
  });

  comment.associate = models => {
    comment.belongsTo(models.Pin);
    comment.belongsTo(models.User);
  };

  return comment;
};

export { Comment as default };
