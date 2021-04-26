"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.belongsToMany(models.User, { through: models.UserProduct });
      Product.hasMany(models.UserProduct, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title is required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image Url is required",
          },
          isUrl: {
            args: true,
            msg: "Image Url must be on Url format",
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is required",
          },
          min: {
            args: [0],
            msg: "Price must be greater then 0",
          },
          isInt: {
            args: true,
            msg: "Price must be number",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock is required",
          },
          min: {
            args: [0],
            msg: "Stock must be greater then 0",
          },
          isInt: {
            args: true,
            msg: "Stock must be number",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "CategoryId is required",
          },
        },
      },
      sold: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate: (product) => {
          product.sold = 0;
        },
      },
    }
  );
  return Product;
};
