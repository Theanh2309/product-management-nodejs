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
  // validate
  // if (!req.body.title) {
  //   // neu ko nhap tieu de
  //   // luu tru 1 thong bao tam thoi
  //   req.flash("error", "vui long nhap tieu de");
  //   // Kết thúc request bằng cách chuyển hướng lại trang trước đó
  //   res.redirect("back");
  //   // ngan chan thuc thi nhungdoan code ben duoi
  //   return;
  // }

  // if (req.body.title.length < 1) {
  //   // neu ko nhap tieu de
  //   // luu tru 1 thong bao tam thoi
  //   req.flash("error", "vui long nhap tieu de it nhat 1 ki tu");
  //   // Kết thúc request bằng cách chuyển hướng lại trang trước đó
  //   res.redirect("back");
  //   // ngan chan thuc thi nhungdoan code ben duoi
  //   return;
  // }
  // convet to number
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  // console.log(req.body);
  // console.log(req.file); image, gocx,...(file)

  if (!req.body.position || req.body.position.trim() === "") {
    // Đếm số sản phẩm trong DB và tăng thêm 1
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  // luu path image vao db
  if (req.file) {
    // neu co file up len thi moi cho vao db => tranh die server
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  // localhost:3000/upload/duong_dan_anh
  // create 1 sp o phia modal de validate schema(chua luu vao db)
  const product = new Produc(req.body);
  // insert to db
  await product.save();
  res.redirect(`${systemcConfig.prefixAdmin}/products`);
};

module.exports.edit = async (req, res) => {
  // lay ra thong tin san pham dua vao id san pham => tra ve view de hien thi
  const id = req.params.id;
  // truy van
  try {
    const find = {
      // san pham xoa roi thi ko cho edit nua
      deleted: false,
      _id: id,
    };
    const product = await Product.findOne(find);
    // find tra ra 1 array => findone tim 1 phan tu=> tra ra object

    res.render("admin/page/products/edit.pug", {
      pageTitle: "chinh sua san pham",
      // truyen data ra ngoai view
      product: product,
    });
  } catch (error) {
    // req.flash("error", "khong ton tai san pham nay!");
    redirect(`${systemcConfig.prefixAdmin / products}`);
  }
};

module.exports.editPatch = async (req, res) => {
  // console.log(req.body)
  //  moõi con troller phải trả về gì đó cho giao diện để tránh load vô hạn
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  // neu co gui file mois len thi update lại file mới bằng link mới
  // luu path image vao db
  if (req.file) {
    // neu co file up len thi moi cho vao db => tranh die server
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  // localhost:3000/upload/duong_dan_anh
  // create 1 sp o phia modal de validate schema(chua luu vao db)
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "update thanh cong");
  } catch (error) {
    req.flash("error", "update ko thanh cong");
  }
  // back lai trang chinh sua
  res.redirect("back");
};
// UPLOAD IMAGE
// upload => folder /public/upload(ma hoa anh thanh ten file(xem trong req.(filename duy nhat tranh trunhg ten anh))))
// lay anh trong folder /public/upload =>format-> up len db
// cutom file name
module.exports.detail = async (req, res) => {
  // tim kiem ban ghi
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    res.render("admin/page/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemcConfig.prefixAdmin}/products`);
  }
};
