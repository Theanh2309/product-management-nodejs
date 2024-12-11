const multer = require("multer");

module.exports = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      // cusstom ten file anh
      // luu ten file duoi dang (time + ten file)
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  return storage;
};
