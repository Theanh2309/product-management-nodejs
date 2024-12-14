require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter");
// cau hinh tai khoan clodinary
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, // eslint-disable-line
  api_key:process.env.API_KEY_CLOUDINARY, // eslint-disable-line
  api_secret:process.env.API_SECRET, 
});
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("API_KEY_CLOUDINARY:", process.env.API_KEY_CLOUDINARY);
console.log("API_SECRET:", process.env.API_SECRET);

// dest: dung tu thu nuc root
// const upload = multer({ dest: "./public/uploads" });
// luu y: goi ham
// day la cau hinh de upload vao forder upload(offline)
// const upload = multer({ storage: storageMulter() });
const upload = multer();
// nhung controller dashboard
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

// call function
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
// delete multi item
router.patch("/change-multi", controller.changeMulti);
// delete 1 item
router.delete("/delete/:id", controller.deleteItem);

// create product(route co the trung nhau nhung phuong thuc khac nhau)
// (neu nguoi dung GET thi tra ra giao dien, gui pguong thuc la POST thi gui data)
router.get("/create", controller.create);
// thumbnail: truong trong db
router.post(
  "/create",
  upload.single("thumbnail"),
  // cấu hình hàm để upload lên anhr cloud (nhung chua biet upload len tai khoan nao)
  function (req, res, next) {
    // neu nguoi dung upload file thi cho up len online
    if(req.file){
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
// khi gui file len back end=> console.log req se co key: file, buffer: gui len chuoi ma hoa nhi phan
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
      // chờ cho đến lúc upload xong
        let result = await streamUpload(req);
        console.log(result);
        //overrite
        req.body.thumbnail = result.url
        // req.body[req.file.fieldname] = result.url(filedname===thumbnail)
        next()
      }
      
      // đây là hàm asyn await nên nếu để nẽxt() ở dưới thì next sẽ chạy trước(tức là controler chạy trước và sẽ upload ảnh vào db trước khi upload ảnh lên cloud) 
      upload(req)
    }else{
      next();

    }
   
  },
  // middle ware
  validate.createPost,
  // nếu ghi các hàm ở đây là luôn có réq và res mà ko cần truyền(điển hình validate.createPost )
  controller.createPost
);

// EDIT PRODUCT
router.get("/edit/:id", controller.edit);
// thumbnail: truong trong db
router.patch(
  "/edit/:id",
  // neu co upload anh thi cung upload len
  upload.single("thumbnail"),
  // middle ware
  // validate giong voi post
  validate.createPost,
  // nếu ghi các hàm ở đây là luôn có réq và res mà ko cần truyền(điển hình validate.createPost )
  controller.editPatch
);

router.get("/detail/:id", controller.detail);
module.exports = router;
