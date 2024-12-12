module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    // neu ko nhap tieu de
    // luu tru 1 thong bao tam thoi
    req.flash("error", "vui long nhap tieu de");
    // Kết thúc request bằng cách chuyển hướng lại trang trước đó
    res.redirect("back");
    // ngan chan thuc thi nhungdoan code ben duoi
    return;
  }

  // chỉ in ra giao diện mà ko phẩn hồi về cho front end=>load mãi(để chờ kết quả) =>die
  // console.log("OK");
  // đi tiếp vào ông C(controller.createPost)(bước cuối cùng)
  next();
};
// NẾU LÀ MIDDLE WARE THÌ NEXT ĐỂ CHẠY QUA THĂNNGF TIẾP THEO

// check những từ bậy bạ trong list bậy baj có tồn tại thì in ra thông báo
// middale wwre ddc Hiểu là hàm trung gian, trước khi đi vào controller thì sẽ vào hàm trung gian này để kiểm tra xem thỏa mãn không
