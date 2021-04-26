const { Router } = require("express");

const { ProductController } = require("../controllers");
const { adminAuthorize } = require("../middlewares");

const router = Router();

router.use("/", adminAuthorize);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.patch("/:id/stock", ProductController.updateStock);
router.delete("/:id", ProductController.delete);

module.exports = router;
