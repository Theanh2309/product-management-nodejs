const Product = require("../../models/product.model");
// controller co nhiem vu xu ly cac logic
module.exports.index = async (req, res) => {
  // render theo dieu kien(filter)
  const products = await Product.find({
    // bo loc
    status: "active",
    deleted: false,
  });
  // logic them 1 filed newprice
  const newProducts = products.map((item) => ({
    ...item.toObject(), // Sao chép toàn bộ thuộc tính của item (nếu dùng Mongoose)
    priceNew: Number(
      ((item.price * (100 - item.discountPercentage)) / 100).toFixed()
    ), // Giá trị dạng số
  }));

  console.log(newProducts);
  res.render("client/page/products/index.pug", {
    pageTitle: "DS san pham",
    products: newProducts,
  });
};
