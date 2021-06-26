'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256]
      }
    },
  }, {});
  Type.associate = function(models) {
    Type.hasMany(models.Group, {foreignKey: 'typeId'})
  };
  return Type;
};
