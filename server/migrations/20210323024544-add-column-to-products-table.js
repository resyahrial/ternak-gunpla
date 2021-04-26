"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "sold", Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "sold");
  },
};
