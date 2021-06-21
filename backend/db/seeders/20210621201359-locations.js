'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Locations', [
        { name: 'Ul\'dah', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Limsa Lominsa', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Gridania', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Ishgard', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Mor Dhona', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
        { name: 'Kugane', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
        { name: 'The Crystarium', locale: 'Near the Aetheryte', createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Locations', null, {});
  }
};
