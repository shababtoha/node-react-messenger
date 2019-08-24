'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  User.associate = function(models) {
    User.hasMany(models.Participant, {
        foreignKey: "UserId",
        onDelete: "CASCADE",
    });

    User.hasMany(models.Message, {
      foreignKey: "UserId",
      onDelete: "CASCADE",
    })
  };
  return User;
};