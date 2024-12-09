// [GET] /admin/products
const Product = require("../../models/product.model");

// import ham helpers
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/paginations");

// export ten controller(products)
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  const filtersStatus = filterStatusHelper(req.query);
  // console.log(filtersStatus) --obj

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
  // =======================================
  // Đánh dấu trạng thái được chọn
  // c2: (25->48)
  // const currentStatus = req.query.status || ""; // Nếu không có `status`, mặc định là ""
  // filtersStatus.forEach((filter) => {
  //   filter.class = filter.status === currentStatus ? "active" : "";
  // });

  // // Xây dựng điều kiện tìm kiếm
  // const find = { deleted: false };
  // if (currentStatus) {
  //   find.status = currentStatus;
  // }
  // ===========================================

  // chuc nang search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // console.log(objectSearch);
  // chuyen qua helper==================================
  // let keyword = "";
  // if (req.query.keyword) {
  //   keyword = req.query.keyword;
  //   // truy van db, lay ra cac ban ghi co title la iphone
  //   // Tìm kiếm tiêu đề chứa từ khóa (không phân biệt chữ hoa/thường)
  //   const regex = new RegExp(keyword, "i");
  //   find.title = regex;
  // }
  // ====================================================================

  // PAGINATION
  // let objectPagination = {
  //   currentPage: 1,
  //   limitItem: 4,
  // };

  // dùng model bên này hoặc bên helper phải nhúng
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    // ko Truyền obj này sang bên kia để ko bị fix cứng
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProducts
  );

  // // lay ra trang hien tai
  // if (req.query.page) {
  //   objectPagination.currentPage = parseInt(req.query.page) || 1;
  // }

  // objectPagination.skip =
  //   (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // // total products with filtler conditional va total page
  // const countProducts = await Product.countDocuments(find);
  // const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
  // objectPagination.totalPage = totalPage
  //=================================== END PAGINATION

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
  res.render("admin/page/products/index.pug", {
    pageTitle: "trang san pham admin",
    products: products,
    // truyen ra cho views
    filtersStatus: filtersStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATH] admin/products/change-status/:status/:id
// tạo ra route riêng để handle logic khác biệt
module.exports.changeStatus = async (req, res) => {
  // lay ra cac bien route dong(dynamic route) voi cu phap :   req.params
  const { status, id } = req.params;
  // update status
  await Product.updateOne({ _id: id }, { status: status });
  // res.send(`${status} - ${id}`);

  // cap nhat xong => redirect
  // res.redirect(`admin/products?page=${2}`);
  res.redirect("back");
};

// [PATH] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  // body parser
  // console.log(req.body);

  const type = req.body.type;
  // convert string ids => array
  const ids = req.body.ids.split(", ");
  // sau nay co the co nhieu type(delete...) => switch case
  switch (type) {
    case "active":
      // update 1 mang id ma minh muon update thay vi 1 id
      // chua vaidate
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    default:
      break;
  }
  res.redirect("back");
};
