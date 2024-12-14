require("dotenv").config();
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');

cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, // eslint-disable-line
  api_key:process.env.API_KEY_CLOUDINARY, // eslint-disable-line
  api_secret:process.env.API_SECRET, 
});
// cấu hình hàm để upload lên anhr cloud (nhung chua biet upload len tai khoan nao)
module.exports.upload = (req, res, next) => {
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
 
}