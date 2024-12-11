// [GET] /admin/products
const Product = require("../../models/product.model");
const systemcConfig = require("../../config/system");
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
    .sort({ position: "desc" })
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

// [PATCH] admin/products/change-status/:status/:id
// tạo ra route riêng để handle logic khác biệt
module.exports.changeStatus = async (req, res) => {
  // lay ra cac bien route dong(dynamic route) voi cu phap :   req.params
  const { status, id } = req.params;
  // update status
  await Product.updateOne({ _id: id }, { status: status });
  // res.send(`${status} - ${id}`);

  // cap nhat xong => redirect
  // res.redirect(`admin/products?page=${2}`);
  req.flash("success", "cap nhat trang thai san pham thanh cong");

  res.redirect("back");
};

// [PATCH] admin/products/change-multi
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
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `cap nhat trang thai san pham thanh cong ${ids.length} san pham hoat dong`
      );
      break;
    case "inactive":
      // tat ca update cung 1 gia tri
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `cap nhat trang thai san pham thanh cong ${ids.length} san pham dung hoat dong`
      );

      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `xoa san pham thanh cong ${ids.length} san pham`);
      break;
    case "change-position":
      // console.log(ids)
      // tat ca update nhung gia tri khac nhau(vế thứ 2) => lap qua tung item va update tung item
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        req.flash(
          "success",
          `thanh doi vi tri san pham thanh cong ${ids.length} san pham`
        );
      }
      // await Product.updateMany(
      //   { _id: { $in: ids } }

      //   { deleted: true, deletedAt: new Date() }
      // );
      break;
    default:
      break;
  }
  res.redirect("back");
};

// [DELETE] admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  // xoa  vinh vien(xoa cung)
  // await Product.deleteOne({ _id: id });
  // xoa mem dong thoi cap nhat thoi gian xoa
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );

  res.redirect("back");
};

// [GET] admin/products/create
// tao giao dien => phuong thuc GET, submit => POST
module.exports.create = async (req, res) => {
  res.render("admin/page/products/create.pug", {
    pageTitle: "them moi san pham",
  });
};

module.exports.createPost = async (req, res) => {
  // convet to number
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  console.log(req.body);
  if (!req.body.position || req.body.position.trim() === "") {
    // Đếm số sản phẩm trong DB và tăng thêm 1
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  // create 1 sp o phia modal de validate schema(chua luu vao db)
  const product = new Product(req.body);
  // insert to db
  await product.save();
  res.redirect(`${systemcConfig.prefixAdmin}/products`);
};
