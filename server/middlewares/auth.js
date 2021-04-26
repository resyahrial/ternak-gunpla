const { User, UserProduct } = require("../models");
const { verifyToken } = require("../helpers");

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { name: "Please login first" };
    }

    const { email, role } = verifyToken(req.headers.access_token);
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw { name: "Invalid Token" };
    }

    req.loggedUser = {
      id: user.id,
      email,
      role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

const adminAuthorize = async (req, res, next) => {
  if (req.loggedUser.role !== "admin") {
    next({
      name: "Access restricted! Admin only",
    });
  }
  next();
};

const userAuthorize = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const { id } = req.params;
    const action = await UserProduct.findOne({ where: { id } });

    if (!action) {
      throw { name: "Action not found" };
    }

    if (action.UserId !== userId) {
      throw { name: "Unauthorized user" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticate,
  adminAuthorize,
  userAuthorize,
};
