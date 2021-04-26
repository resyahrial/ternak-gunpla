const { User } = require("../models");
const { verifyPassword, getToken } = require("../helpers");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "Please fill all fields" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !verifyPassword(password, user.password)) {
        throw { name: "Invalid email / password" };
      }

      const access_token = getToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        id: user.id,
        first_name: user.first_name,
        role: user.role,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const user = await User.create({
        first_name,
        last_name,
        email,
        password,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
