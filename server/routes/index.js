const { Router } = require("express");

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const whislistRouter = require("./whislistRouter");
const cartRouter = require("./cartRouter");
const { ProductController, CategoryController } = require("../controllers");
const { authenticate } = require("../middlewares");

const router = Router();

router.use("/", userRouter);
router.get("/categories", CategoryController.findAll);
router.get("/products", ProductController.findAll);

router.use(authenticate);
router.use("/products", productRouter);
router.use("/whislists", whislistRouter);
router.use("/carts", cartRouter);

module.exports = router;
