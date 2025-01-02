const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/roles.controller");
// call function
router.get("/", controller.index);

// POST /admin/roles/create
router.get("/create", controller.create);
router.post("/create", controller.createPost);

router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);

router.get("/permissions", controller.permissions);
router.patch("/permissions", controller.permissionsPatch);
// PATCH /admin/roles/permissions
module.exports = router;
