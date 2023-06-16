const { detailValidator } = require("../validators/detailValidator");
const { DetailController } = require("../controllers/DetailController");


const router = require("express").Router()

// router.post("/", DetailController.create)
router.post("/", detailValidator, DetailController.create)
router.get("/", DetailController.getAllDetails)
router.put("/:id", DetailController.update)
router.delete("/:id", DetailController.delete)
router.get("/:id", DetailController.getDetailById)
router.get("/product/:id", DetailController.getDetailByProductId)

module.exports = router