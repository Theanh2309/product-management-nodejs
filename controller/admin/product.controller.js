// [GET] /admin/products
const Product = require("../../models/product.model");
// export ten controller(dashboard)
module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  let find = {
    deleted: false,
    // truyen thang vaof day thi ko if else dc
    // status: req.query.status
  };
  // khong phai luc nao cung truy van status nen ta de ben ngoai obj find de co the if else
  // add key
  if (req.query.status) {
    find.status = req.query.status;
  }
  // truong Hợp chọn all thì ko truyền params hoặc truyền string rỗng để underfine nên câu điều kiện ìf ko chạy vào thì nó sẽ lấy tất cả trong db

  const products = await Product.find(find);
  res.render("admin/page/products/index.pug", {
    pageTitle: "trang san pham admin",
    products: products,
  });
};
