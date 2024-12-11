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
// ĐỂ TRUYỀN CÁC PARAMS LÊN ỦRL THÌ PHẢI ĐỊNH NGHĨA TRƯỚC URL

// CHECK BOX MULTI
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  // get input checkall
  const inputCheckAll = checkboxMulti.querySelector("input[name= 'checkall']");
  const inputIds = checkboxMulti.querySelectorAll("input[name= 'id']");
  // logic check-all
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputIds.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputIds.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name= 'id']:checked"
      ).length;
      if (countChecked == inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

// end checkbox multi

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    // lay ra danh sach cac input da check
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name= 'id']:checked"
    );

    // lay ra kieu hanh dong
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("ban co muon xoa ko?");
      // neu HUy thi ko gui len server thong qua submit(neu ko xoa thi cung ko gui len server)
      if (!isConfirm) {
        return;
      }
    }

    // neu nguoi dung co lua chon thi thuc thi
    // console.log(inputsChecked);
    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name = 'ids']");
      // lay ra nhung input da check
      inputsChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          // gui kem theo position
          const position = input
            .closest("tr")
            .querySelector("input[name = 'position']").value;
          // form ko gui di obj, array duoc nen uu tien gui string
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      // convert to string
      // console.log(ids.join(", "));
      // insert to input
      // form thi ko gui dc 1 mang nhu dung theo huong API nen phai convert ve string de input chứa đc =. gui backend roi backend convert ve mang
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("chon it nhat 1 ban ghi");
    }
  });
}
// end form change multi

// handle logic show alert
const showAlert = document.querySelector("[show-alert]");
const closeAlert = showAlert.querySelector("[close-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

// hidden
