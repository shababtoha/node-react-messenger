'use strict';
module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define('message', {
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
    message.associate = function (models) {
        // associations can be defined here
        message.belongsTo(models.user, {
            foreignKey: "sentBy",
            onDelete: "CASCADE"
        });

        message.belongsTo(models.conversation, {
            foreignKey: "conversationId",
            onDelete: "CASCADE"
        });
    };
    return message;
};