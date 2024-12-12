const express = require("express");
const router = express.Router();

const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
// dest: dung tu thu nuc root
// const upload = multer({ dest: "./public/uploads" });
// luu y: goi ham
const upload = multer({ storage: storageMulter() });

// nhung controller dashboard
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

// call function
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
// delete multi item
router.patch("/change-multi", controller.changeMulti);
// delete 1 item
router.delete("/delete/:id", controller.deleteItem);

// create product(route co the trung nhau nhung phuong thuc khac nhau)
// (neu nguoi dung GET thi tra ra giao dien, gui pguong thuc la POST thi gui data)
router.get("/create", controller.create);
// thumbnail: truong trong db
router.post(
  "/create",
  upload.single("thumbnail"),
  // middle ware
  validate.createPost,
  // nếu ghi các hàm ở đây là luôn có réq và res mà ko cần truyền(điển hình validate.createPost )
  controller.createPost
);

// EDIT PRODUCT
router.get("/edit/:id", controller.edit);
// thumbnail: truong trong db
router.patch(
  "/edit/:id",
  // neu co upload anh thi cung upload len
  upload.single("thumbnail"),
  // middle ware
  // validate giong voi post
  validate.createPost,
  // nếu ghi các hàm ở đây là luôn có réq và res mà ko cần truyền(điển hình validate.createPost )
  controller.editPatch
);

router.get("/detail/:id", controller.detail);
module.exports = router;
