module.exports = (objectPagination, query, countProducts) => {
  // lay ra trang hien tai
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page) || 1;
  }
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;
  // total products with filtler conditional va total page
  // const countProducts = await Product.countDocuments(find);

  const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  return objectPagination;
};
