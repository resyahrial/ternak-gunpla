"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "first_name", Sequelize.STRING),
      queryInterface.addColumn("Users", "last_name", Sequelize.STRING),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "first_name"),
      queryInterface.removeColumn("Users", "last_name"),
    ]);
  },
};
