'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {});
  Participant.associate = function(models) {
    Participant.belongsTo(models.Conversation, {
      foreignKey: "ConversationId",
      onDelete: "CASCADE"
    });

    Participant.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    })
  };
  return Participant;
};