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
module.exports.create = async (req, res) => {
  res.render("admin/page/products-category/create.pug"),{
    pageTitle: "danh muc san pham",
   
  } 
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