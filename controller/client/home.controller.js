module.exports.index = (req, res) => {
  // controller: lay data tra ve view
  res.render("client/page/home/index.pug", { pageTitle: "trang chu" });
};
