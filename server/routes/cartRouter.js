const { Router } = require("express");

const { CartController } = require("../controllers");
const { userAuthorize } = require("../middlewares");

const router = Router();

router.post("/:productId", CartController.create);
router.get("/", CartController.findAll);
router.patch("/:id/quantity", userAuthorize, CartController.update);
router.delete("/:id", userAuthorize, CartController.delete);

module.exports = router;
