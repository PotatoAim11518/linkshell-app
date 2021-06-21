'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RSVPs', [
        { userId: 2, eventId: 1, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RSVPs', null, {});
  }
};
