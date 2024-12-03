const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/products.controller");
// tao ra cac router
// dùng kiểu này để đỡ phải truyền app sang, cho đõe lâu nếu nhiều router
router.get("/", controller.index);

router.get("/create", async (req, res) => {
  // res.render -> mac dinh di vao foder views

  res.render("client/page/products/index.pug");
});
router.get("/edit", async (req, res) => {
  res.render("client/page/products/index.pug");
});

module.exports = router;
