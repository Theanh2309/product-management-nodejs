module.exports.index = async (req, res) => {
  res.render("client/page/products/index.pug", {
    pageTitle: "DS san pham",
  });
};
