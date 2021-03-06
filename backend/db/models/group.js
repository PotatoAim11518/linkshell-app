'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 128]
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 2000]
      }
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Group.associate = function(models) {
    Group.belongsTo(models.User, {foreignKey: 'ownerId'})
    Group.belongsTo(models.Type, {foreignKey: 'typeId'})
    Group.hasMany(models.UserGroup, {foreignKey: 'groupId'})
    Group.hasMany(models.Event, {foreignKey: 'groupId'})
  };
  return Group;
};
