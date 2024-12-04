// [GET] /admin/products

// export ten controller(dashboard)
module.exports.index = (req, res) => {
  res.render("admin/page/products/index.pug", {
    pageTitle: "trang san pham admin",
  });
  // res.send("DSSP ADMIN");
};
