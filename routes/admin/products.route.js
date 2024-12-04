const express = require("express");
const router = express.Router();
// nhung controller dashboard
const controller = require("../../controller/admin/product.controller");
// call function
router.get("/", controller.index);

module.exports = router;
