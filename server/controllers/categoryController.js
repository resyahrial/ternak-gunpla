const { Category } = require("../models");

class Controller {
  static async findAll(req, res, next) {
    try {
      const products = await Category.findAll({
        attribute: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
