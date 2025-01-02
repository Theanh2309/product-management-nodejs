// model Role
const Role = require("../../models/roles.model");
const systemcConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/page/roles/index.pug", {
    pageTitle: "trang nhom quyen",
    records: records,
  });
};

// [GET] /admin/roles/create

module.exports.create = async (req, res) => {
  res.render("admin/page/roles/create.pug", {
    pageTitle: "Tao nhom quyen",
  });
};
// [POST] /admin/roles/create

module.exports.createPost = async (req, res) => {
  const { title, description } = req.body;
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemcConfig.prefixAdmin}/roles`);
};

// GET /admin/roles/edit/id
module.exports.edit = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };
    const records = await Role.findOne(find);
    res.render("admin/page/roles/edit.pug", {
      pageTitle: "chinh sua nhom quyen",
      records: records,
    });
  } catch (error) {
    res.redirect(`${systemcConfig.prefixAdmin}/roles`);
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    await Role.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "cap nhat nhom quyen thanh cong");
    res.redirect("back");
  } catch (error) {
    req.flash("success", "cap nhat nhom quyen that bai");
  }
};

// [GET] /admin/roles/permissions

module.exports.permissions = async (req, res) => {
  // get list quyen
  const find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/page/roles/permissions.pug", {
    pageTitle: "Phan quyen",
    records: records,
  });
};

module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    const id = item.id;
    const permissions = item.permissions;
    console.log({ item });
    await Role.updateOne({ _id: id }, { permissions: permissions });
  }
  req.flash("success", "cap nhat phan quyen thanh cong");
  res.redirect("back");
};
