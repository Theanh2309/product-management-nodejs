const { redirect } = require("express/lib/response");
const systemcConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
// [GET] /admin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  // function createTree(arr, parentId = "") {
  //   const tree = [];
  //   arr.forEach(item => {
  //     // So sánh dạng chuỗi
  //     if (String(item.parent_id) === String(parentId)) {
  //       const newItem = { ...item }; // Tạo bản sao object
  //       const children = createTree(arr, String(item._id)); // Truyền `_id` dưới dạng chuỗi
  //       if (children.length > 0) {
  //         newItem.children = children;
  //       }
  //       tree.push(newItem);
  //     }
  //   });
  //   return tree;
  // }

  const records = await ProductCategory.find(find).lean();
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/page/products-category/index.pug", {
    pageTitle: "danh muc san pham",
    records: newRecords,
  });
};

// [GET] /admin/product-category/create
// giao dien tao danh muc san pham
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  // function createTree(arr, parentId = "") {
  //   const tree = [];
  //   arr.forEach(item => {
  //     // So sánh dạng chuỗi
  //     if (String(item.parent_id) === String(parentId)) {
  //       const newItem = { ...item }; // Tạo bản sao object
  //       const children = createTree(arr, String(item._id)); // Truyền `_id` dưới dạng chuỗi
  //       if (children.length > 0) {
  //         newItem.children = children;
  //       }
  //       tree.push(newItem);
  //     }
  //   });
  //   return tree;
  // }

  // get danh muc hien co trong db -> front-end
  const records = await ProductCategory.find(find).lean();
  // lean() : lay du lieu thuan tuy tu db

  const newRecords = createTreeHelper.tree(records);

  // console.log("Danh mục dạng cây:", JSON.stringify(newRecords, null, 2));

  res.render("admin/page/products-category/create.pug", {
    pageTitle: "danh muc san pham",
    records: newRecords,
  });
};

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.position == "") {
      const count = await ProductCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    console.log({ record });
    res.redirect(`${systemcConfig.prefixAdmin}/products-category`);
  } catch (error) {
    console.log(error);
    es.status(500).send("Lỗi khi tạo danh mục mới.");
  }
};

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
  // tranh truong hop nguoi dung sua id tren url lam die web =>try catch
  // chi cần sửa ở GET vì mỗi phương thức này mới hiển thị id trên url
  // còn phương thức khác id cũng chuyển lên url nhưng ng dùng ko thấy
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };

    // tim kiem 1 danh muc
    const data = await ProductCategory.findOne(find).lean();
    // lean() : lay du lieu thuan tuy tu db

    // get tat ca danh muc hien co trong db -> front-end
    const records = await ProductCategory.find({
      deleted: false,
    }).lean();
    // đổ ra view cho front-end
    const newRecords = createTreeHelper.tree(records);

    // console.log("Danh mục dạng cây:", JSON.stringify(newRecords, null, 2));

    res.render("admin/page/products-category/edit.pug", {
      pageTitle: "Chinh sua danh muc san pham",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemcConfig.prefixAdmin}/products-category`);
    // redirect 404.pug
  }
};
// [PATCH] /admin/product-category/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  console.log(req.body);
  // neu co gui file mois len thi update lại file mới bằng link mới
  // luu path image vao db
  // if (req.file) {
  //   // neu co file up len server thi moi cho vao db => tranh die server(day la upload vao du an ko phai upload len cloud)
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }
  // localhost:3000/upload/duong_dan_anh
  // create 1 sp o phia modal de validate schema(chua luu vao db)
  try {
    await ProductCategory.updateOne({ _id: id }, req.body);
    // req.flash("success", "update thanh cong");
    res.redirect("back");
  } catch (error) {
    // req.flash("error", "update ko thanh cong");
    console.log(error);
  }
  // back lai trang chinh sua
};
