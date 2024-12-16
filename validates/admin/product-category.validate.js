module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    // neu ko nhap tieu de
    // luu tru 1 thong bao tam thoi
    req.flash("error", "vui long nhap tieu de");
    // Kết thúc request bằng cách chuyển hướng lại trang trước đó
    res.redirect("back");
    return;
  }
  next();
};