const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/home.controller");
// router.get("/", (req, res) => {
//   res.render("client/page/home/index.pug");
// });

// index hieu la trang chinh cua trang home
router.get("/", controller.index);

module.exports = router;
