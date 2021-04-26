"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProduct.belongsTo(models.User, { foreignKey: "UserId" });
      UserProduct.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  UserProduct.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      transaction_id: DataTypes.STRING,
      is_paid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserProduct",
      hooks: {
        beforeCreate: (action) => {
          action.quantity = 1;

          if (!action.is_paid) {
            action.is_paid = false;
          }
        },
      },
    }
  );
  return UserProduct;
};
