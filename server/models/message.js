'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attachment_url: {
      type: DataTypes.STRING
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: "SentBy",
      onDelete: "CASCADE"
    });

    Message.belongsTo(models.Conversation, {
      foreignKey: "ConversationId",
      onDelete: "CASCADE"
    });
  };
  return Message;
};