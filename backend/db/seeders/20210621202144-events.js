'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', [
        { name: 'Test Event 1', date: '2021-06-24', capacity: 42, about: "Event description placeholder text 1", hostId: 1, locationId: 1, groupId: 1, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Test Event 2', date: '2021-06-24', capacity: 32, about: "Event description placeholder text 2", hostId: 1, locationId: 3, groupId: 1, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Events', null, {});
  }
};
