const mongoose = require("mongoose");
// connect to db
// ko de lo thong tin db
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect to db SUCCESS");
  } catch {
    console.log("connect to db ERROR!");
  }
};

// kiem tra ket noi thanh cong hay that bai
