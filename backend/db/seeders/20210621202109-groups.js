'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Groups', [
        { name: 'Dungeon Masters', about: 'Grinding for gear', typeId: 1, ownerId: 1, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Sprouts', about: 'Getting to levelcap or bust', typeId: 4, ownerId: 2, createdAt: new Date(), updatedAt: new Date()},
        { name: 'Loremasters', about: 'ACTUALLY', typeId: 3, ownerId: 3, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Groups', null, {});
  }
};
