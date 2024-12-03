// dùng thì impỏt những router của phần prodcut
const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
module.exports = (app) => {
  // app.get("/", (req, res) => {
  //   res.render("client/page/home/index.pug");
  // });
  app.use("/", homeRoutes);

  // app.get("/products", async (req, res) => {
  //   // res.render -> mac dinh di vao foder views
  //   res.render("client/page/products/index.pug");
  // });
  // =================================
  // app.use để xử dụng cái router product
  //  Bnar chất là đi vào /product thì chạy vào hàm productRoutes
  // hàm productRoutes thì chứa các route con
  // bên này có /product rồi thì bên kia ko cần, nếu ghi thì nó nối vào nhau
  app.use("/products/", productRoutes);
  // hiểu /product là tiền tố chung của các router
};
