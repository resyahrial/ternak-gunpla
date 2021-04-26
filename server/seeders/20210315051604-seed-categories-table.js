"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { title: "Super Deform" },
      { title: "High Grade" },
      { title: "Real Grade" },
      { title: "Master Grade" },
      { title: "Perfect Grade" },
    ];
    categories.forEach((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
