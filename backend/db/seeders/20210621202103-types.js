'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Types', [
        { name: 'Dungeons', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Trials', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Questing', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Leveling', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Alliance Raid', createdAt: new Date(), updatedAt: new Date()},
        { name: 'FATEs', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Duty Roulette', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Crafting', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Music', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Theorycrafting', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Roleplaying', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Mentoring', createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Types', null, {});
  }
};
