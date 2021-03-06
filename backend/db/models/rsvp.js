'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
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
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  RSVP.associate = function(models) {
    RSVP.belongsTo(models.Event, {foreignKey: 'eventId'})
    RSVP.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return RSVP;
};
