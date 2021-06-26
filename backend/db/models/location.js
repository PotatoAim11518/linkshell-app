'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
