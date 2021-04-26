const { Router } = require("express");

const { UserController } = require("../controllers");
const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

module.exports = router;
