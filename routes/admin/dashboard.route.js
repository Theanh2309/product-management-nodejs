const express = require("express");
const router = express.Router();
// nhung controller dashboard
const controller = require("../../controller/admin/dashboard.controller");
// call function
router.get("/", controller.dashboard);

module.exports = router;
