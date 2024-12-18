const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const controller = require("../../controller/admin/products-category.controller");
const validate = require("../../validates/admin/product-category.validate");
const uploadCloud = require("../../middleware/admin/uploadClould.middleware");

// READ
router.get("/", controller.index);

// CREATE
router.get("/create", controller.create);
router.post(
  "/create",
  // upload img
  upload.single("thumbnail"),
  // upload img to cloud
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

// UPDATE(EDIT)
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  // upload img
  upload.single("thumbnail"),
  // upload img to cloud
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);
module.exports = router;
