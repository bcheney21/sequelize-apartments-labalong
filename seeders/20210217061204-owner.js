'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('owners', [
        {
          name: "Donald",
          age: 29,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "John",
          age: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Jane",
          age: 43
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Yuki",
          age: 67
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Erin",
          age: 21
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Siobhan",
          age: 55
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "A magic talking dog",
          age: 5000000
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Joan of Arc",
          age: 600
        },
        {
          name: "Randy 'The Macho Man' Savage",
          createdAt: new Date(),
          updatedAt: new Date(),
          age: 55
        },
      ])
      return 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('owner', null, {})
  }
};
