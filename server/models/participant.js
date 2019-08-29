'use strict';
module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define('participant', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {});
  participant.associate = function(models) {
    participant.belongsTo(models.conversation, {
      foreignKey: "conversationId",
      onDelete: "CASCADE"
    });

    participant.belongsTo(models.user, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return participant;
};