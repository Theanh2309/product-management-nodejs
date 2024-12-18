const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/roles.controller");
// call function
router.get("/", controller.index);

router.get("/create", controller.create);
router.post("/create", controller.createPost);

// POST /admin/roles/create

module.exports = router;
