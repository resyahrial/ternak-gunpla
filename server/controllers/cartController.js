const { User, UserProduct, Product } = require("../models");

class Controller {
  static async create(req, res, next) {
    try {
      const { productId } = req.params;
      const userId = req.loggedUser.id;
      const user = await User.findByPk(userId);
      const isCart = await user.getUserProducts({
        where: {
          ProductId: productId,
          type: "Cart",
        },
      });

      if (isCart.length) {
        throw { name: "Product already in cart" };
      }

      const product = await Product.findByPk(productId);
      if (product.stock < 1) {
        throw { name: "Product is out of stock" };
      }

      const action = await user.addProducts(productId, {
        through: {
          type: "Cart",
          quantity: 1,
        },
      });

      res.status(200).json({
        UserId: action[0].UserId,
        ProductId: action[0].ProductId,
        type: action[0].type,
        quantity: action[0].quantity,
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
          type: "Cart",
        },
      });

      if (action === 0) {
        throw { name: "Cart not found" };
      }

      res.status(200).json({ message: "Cart remove successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const carts = await UserProduct.findAll({
        where: {
          UserId: id,
          type: "Cart",
        },
        attributes: ["id", "UserId", "ProductId", "quantity"],
        order: [["updatedAt", "DESC"]],
        include: {
          model: Product,
          attributes: {
            exclude: ["sold", "createdAt", "updatedAt", "CategoryId"],
          },
        },
      });
      res.status(200).json(carts);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      if (!req.body.quantity) {
        throw { name: "Quantity is required" };
      }

      const { quantity } = req.body;
      if (+quantity < 1) {
        throw { name: `Can't accept negative quantity` };
      }

      const { id } = req.params;
      const cart = await UserProduct.findOne({ where: { id } });
      if (!cart) {
        throw { name: "Cart not found" };
      }

      const product = await Product.findByPk(cart.ProductId);
      if (product.stock < quantity) {
        res.status(400).json({
          message: "Stock is limited",
          stock: product.stock,
        });
        return;
      }

      const updatedCart = await UserProduct.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
          fields: ["quantity"],
          returning: true,
        }
      );

      res.status(200).json({
        UserId: updatedCart[1][0].UserId,
        ProductId: updatedCart[1][0].ProductId,
        quantity: updatedCart[1][0].quantity,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
