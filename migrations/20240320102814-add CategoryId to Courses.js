'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Courses', `CategoryId`, Sequelize.INTEGER);
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courses', `CategoryId`);
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  }
};
