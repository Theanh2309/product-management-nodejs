// viet model trong day
// modal la trung gain ket noi controller va db
const { default: mongoose } = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
  deletedAt: Date,
});
// tham so thu nhat: ten Modal
// tham so thu 3:di tim vao connection(bang)co ten la: products
// Kết nối đến collection "products"
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
