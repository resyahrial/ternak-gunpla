const { Router } = require("express");

const { WhislistController } = require("../controllers");
const { userAuthorize } = require("../middlewares");

const router = Router();

router.post("/:productId", WhislistController.create);
router.get("/", WhislistController.findAll);
router.delete("/:id", userAuthorize, WhislistController.delete);

module.exports = router;
