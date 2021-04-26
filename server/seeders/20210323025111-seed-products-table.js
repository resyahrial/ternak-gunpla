"use strict";
const fs = require("fs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = JSON.parse(
      fs.readFileSync("./data/product.json", "utf-8")
    );
    products.forEach((user) => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Products", products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", products);
  },
};
