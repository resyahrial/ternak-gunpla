"use strict";
const fs = require("fs");
const { hashPassword } = require("../helpers");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
    users.forEach((user) => {
      user.password = hashPassword(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
