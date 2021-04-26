const { User, UserProduct, Product } = require("../models");

class Controller {
  static async create(req, res, next) {
    try {
      const { productId } = req.params;
      const userId = req.loggedUser.id;
      const user = await User.findByPk(userId);
      const isWhislisted = await user.getUserProducts({
        where: {
          ProductId: productId,
          type: "Whislist",
        },
      });
      if (isWhislisted.length) {
        throw { name: "You already whislist this product" };
      }

      const action = await user.addProducts(productId, {
        through: {
          type: "Whislist",
        },
      });

      res.status(200).json({
        UserId: action[0].UserId,
        ProductId: action[0].ProductId,
        type: action[0].type,
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const action = await UserProduct.destroy({
        where: {
          id,
          type: "Whislist",
        },
      });

      if (action === 0) {
        throw { name: "Whislist not found" };
      }

      res.status(200).json({ message: "Whislist remove successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const whislists = await UserProduct.findAll({
        where: {
          UserId: id,
          type: "Whislist",
        },
        attributes: ["id", "UserId", "ProductId"],
        include: {
          model: Product,
          attributes: {
            exclude: ["sold", "createdAt", "updatedAt", "CategoryId"],
          },
        },
      });
      res.status(200).json(whislists);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
