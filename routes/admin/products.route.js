const express = require("express");
const router = express.Router();
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
router.post("/create", controller.createPost);

module.exports = router;
