const express = require("express");
const router = express.Router();
// nhung controller dashboard
const controller = require("../../controller/admin/product.controller");
// call function
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.delete("/delete/:id", controller.deleteItem);

module.exports = router;
