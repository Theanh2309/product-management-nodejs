// viet model trong day
// modal la trung gain ket noi controller va db
// uu diem cua mongooose la co schema=> buọco phải tuân theo bộ khung này( ko cho front end insert truc tiep data vao db neu ko thi front end thich gui cai gi cung insert vao db)
const { default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String, //san pham 1
    product_category_id: { type: String, default: "" },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true }, // san pham 1 - id random(slug luon la duy nhat)
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
// tham so thu nhat: ten Modal
// tham so thu 3:di tim vao connection(bang)co ten la: products
// Kết nối đến collection "products"
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
