const { redirect } = require("express/lib/response");
const systemcConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model") 
// [GET] /admin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await ProductCategory.find(find)
  res.render("admin/page/products-category/index.pug",{
    pageTitle: "danh muc san pham",
    records: records
  } )
};

// [GET] /admin/product-category/create
// giao dien tao danh muc san pham
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }
  function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach(item => {
      // So sánh dạng chuỗi
      if (String(item.parent_id) === String(parentId)) {
        const newItem = { ...item }; // Tạo bản sao object
        const children = createTree(arr, String(item._id)); // Truyền `_id` dưới dạng chuỗi
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  }

// get danh muc hien co trong db -> front-end
  const records = await ProductCategory.find(find).lean()
  // lean() : lay du lieu thuan tuy tu db

  const newRecords = createTree(records)

  console.log("Danh mục dạng cây:", JSON.stringify(newRecords, null, 2));

  res.render("admin/page/products-category/create.pug",{
    pageTitle: "danh muc san pham",
    records: newRecords,
  })
};

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
 try {
  if(req.body.position == ""){
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }else{
    req.body.position = parseInt(req.body.position)
  }
  const record = new ProductCategory(req.body)
  await record.save();
  
} catch (error) {
  console.log(error)
}

res.redirect(`${systemcConfig.prefixAdmin}/products-category`);

// 
};