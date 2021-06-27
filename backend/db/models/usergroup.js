'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  UserGroup.associate = function(models) {
    UserGroup.belongsTo(models.Group, {foreignKey: 'groupId'})
    UserGroup.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return UserGroup;
};
