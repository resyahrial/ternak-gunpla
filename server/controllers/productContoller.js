const { Product, Category, UserProduct } = require("../models");
const { uploadImage, deleteImage } = require("../helpers");

class Controller {
  static async create(req, res, next) {
    let image_url = "";
    try {
      const data = await uploadImage(req);
      image_url = data.image_url;
      const product = await Product.create(data);
      res.status(201).json({
        id: product.id,
        title: product.title,
        image_url: product.image_url,
        price: product.price,
        stock: product.stock,
        CategoryId: product.CategoryId,
      });
    } catch (err) {
      await deleteImage(image_url);
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["title"],
          },
          {
            model: UserProduct,
            attributes: ["id", "UserId", "type"],
          },
        ],
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    let image_url = "";
    try {
      const { id } = req.params;
      const data = await uploadImage(req);
      image_url = data.image_url;
      const updatedProduct = await Product.update(data, {
        where: {
          id,
        },
        attribute: {
          exclude: ["createdAt", "updatedAt"],
        },
        returning: true,
      });

      res.status(200).json(updatedProduct[1]);
    } catch (err) {
      await deleteImage(image_url);
      next(err);
    }
  }

  static async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      const updatedProduct = await Product.update(
        { stock },
        {
          where: {
            id,
          },
          fields: ["stock"],
          attribute: {
            exclude: ["createdAt", "updatedAt"],
          },
          returning: true,
        }
      );

      res.status(200).json(updatedProduct[1]);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const latestUrl = (await Product.findByPk(id)).image_url;
      await deleteImage(latestUrl);
      await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
