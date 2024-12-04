// [GET] /admin/dashboard
// export ten controller(dashboard)
module.exports.dashboard = (req, res) => {
  res.render("admin/page/dashboard/index.pug", {
    pageTitle: "trang tong quan",
  });
};
