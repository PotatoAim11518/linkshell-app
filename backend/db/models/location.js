'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
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
    // associations can be defined here
  };
  return Location;
};
