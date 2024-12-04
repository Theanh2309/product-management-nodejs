const Product = require("../../models/product.model");
// controller co nhiem vu xu ly cac logic
module.exports.index = async (req, res) => {
  // render theo dieu kien(filter)
  const products = await Product.find({
    // bo loc
    status: "active",
    deleted: false,
  });
  // console.log(products);
  // logic them 1 filed newprice
  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed();
  });

  res.render("client/page/products/index.pug", {
    pageTitle: "DS san pham",
    products: newProducts,
  });
};
