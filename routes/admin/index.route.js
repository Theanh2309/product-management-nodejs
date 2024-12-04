const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  // nếu dùng app.use thì nay mai các phương thức bên trong dashboardRoutes sẽ đều laf GET
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  // app.use("/products/", productRoutes);
};
