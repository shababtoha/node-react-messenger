'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Conversation.associate = function(models) {
    Conversation.hasMany(models.Participant,{
      foreignKey: "ConversationId",
      onDelete: "CASCADE",
    });

    Conversation.hasMany(models.Message, {
      foreignKey: "ConversationId",
      onDelete: "CASCADE",
    });
  };
  return Conversation;
};