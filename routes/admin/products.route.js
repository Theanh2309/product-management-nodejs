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
router.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = router;
