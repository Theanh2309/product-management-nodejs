// [GET] /admin/products
const Product = require("../../models/product.model");
// export ten controller(dashboard)
module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  // Định nghĩa các trạng thái bộ lọc
  let filtersStatus = [
    {
      name: "Tat ca",
      status: "",
      class: "",
    },
    {
      name: "Hoat dong",
      status: "active",
      class: "",
    },
    {
      name: "dung hoat dong",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filtersStatus.findIndex((item) => {
      return item.status == req.query.status;
    });

    filtersStatus[index].class = "active";
  } else {
    const index = filtersStatus.findIndex((item) => {
      return item.status == "";
    });
    filtersStatus[index].class = "active";
  }

  // console.log(req.query.status);
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
  const products = await Product.find(find);
  res.render("admin/page/products/index.pug", {
    pageTitle: "trang san pham admin",
    products: products,
    filtersStatus: filtersStatus,
  });
};
