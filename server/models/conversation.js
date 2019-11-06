'use strict';
module.exports = (sequelize, DataTypes) => {
    const conversation = sequelize.define('conversation', {
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
    conversation.associate = function (models) {
        conversation.hasMany(models.participant, {
            foreignKey: "conversationId",
            onDelete: "CASCADE",
        });

        conversation.hasMany(models.message, {
            foreignKey: "conversationId",
            onDelete: "CASCADE",
        });
    };
    return conversation;
};