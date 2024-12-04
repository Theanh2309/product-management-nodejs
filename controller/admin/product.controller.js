// [GET] /admin/products
const Product = require("../../models/product.model");
// export ten controller(dashboard)
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
  });
  res.render("admin/page/products/index.pug", {
    pageTitle: "trang san pham admin",
    products: products,
  });
  // res.send("DSSP ADMIN");
};
