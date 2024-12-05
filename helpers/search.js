module.exports = (query) => {
  // cho vao obj cho de mo rong
  let objectSearch = {
    keyword: "",
  };
  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    // truy van db, lay ra cac ban ghi co title la iphone
    // Tìm kiếm tiêu đề chứa từ khóa (không phân biệt chữ hoa/thường)
    const regex = new RegExp(objectSearch.keyword, "i");
    // them key regex neu nguoi dung nhap text tim kiem
    objectSearch.regex = regex;
  }

  return objectSearch;
};
