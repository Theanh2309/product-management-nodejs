console.log("XU ly logic trang danh sach san pham");
// change status
const formChangeStatus = document.querySelector("#form-change-status");
const patch = formChangeStatus.getAttribute("data-path");

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      // gui du lieu
      const action = patch + `/${statusChange}/${id}?_method=PATCH`;
      // aciton la thuoc tinh co san cua HTMl nen ko can dung setAtribute
      formChangeStatus.action = action;
      // tu dong submit ko can click vao form
      formChangeStatus.submit();
    });
  });
}
