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
  console.log({ title, description });
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemcConfig.prefixAdmin}/roles`);
};
