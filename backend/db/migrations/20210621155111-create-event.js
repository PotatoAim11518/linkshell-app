'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      capacity: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      about: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      locationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Locations"}
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Groups"}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
