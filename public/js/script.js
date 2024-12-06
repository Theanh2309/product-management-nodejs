console.log("OK SCRIPT");

// button status(thuoc tinh tu dinh nghia them dau ngoac vuong)
const buttonsStatus = document.querySelectorAll("[button-status]");

// console.log(buttonsStatus);
if (buttonsStatus.length > 0) {
  // dung new URl de co cac ham (function) de phan tich url trinh duyet(VD: searchParams)
  let url = new URL(window.location.href);

  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        // tat ca
        url.searchParams.delete("status");
      }

      console.log(url.href);
      // redirect
      window.location.href = url.href;
    });
  });
}

// Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value.trim(); // Loại bỏ khoảng trắng
    if (keyword) {
      url.searchParams.set("keyword", keyword); // Cập nhật param keyword
    } else {
      url.searchParams.delete("keyword"); // Xóa param nếu không có keyword
    }

    // Chuyển hướng đến URL đã cập nhật
    window.location.href = url.href;
  });
}

// PAGINATION
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination.length > 0) {
  // dung new URl de co cac ham (function) de phan tich url trinh duyet(VD: searchParams)
  let url = new URL(window.location.href);

  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      // lay page ma nguoi dung click
      const page = button.getAttribute("button-pagination");
      // console.log(status);
      if (page) {
        url.searchParams.set("page", page);
      } else {
        // tat ca
        url.searchParams.delete("page");
      }
      // redirect
      window.location.href = url.href;
    });
  });
}
// ĐỂ TRUYỀN CÁC PARAMS LÊN ỦL THÌ PHẢI ĐỊNH NGHĨA TRƯỚC URL
