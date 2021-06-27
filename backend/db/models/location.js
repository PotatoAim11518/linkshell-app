'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Event, {foreignKey: 'locationId'})
  };
  return Location;
};
