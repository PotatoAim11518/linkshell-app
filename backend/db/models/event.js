'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
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
        len: [3, 64]
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 9999
      }
    },
    about: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.RSVP, {foreignKey: 'eventId', as: "event" })
    Event.belongsTo(models.Location, {foreignKey: 'locationId', as: "location" })
    Event.belongsTo(models.User, {foreignKey: 'hostId', as: "host" })
    Event.belongsTo(models.Group, {foreignKey: 'groupId', as: "group" })
  };
  return Event;
};
