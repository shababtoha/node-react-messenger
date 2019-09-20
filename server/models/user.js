'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNo: {
      type: DataTypes.STRING
    }
  }, {});
  user.associate = function(models) {
    user.hasMany(models.participant, {
        foreignKey: "userId",
        onDelete: "CASCADE",
    });

    user.hasMany(models.message, {
      foreignKey: "sentBy",
      onDelete: "CASCADE",
    })
  };
  return user;
};