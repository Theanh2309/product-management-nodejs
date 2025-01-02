const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    // loop row
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      // ko can luu vao permission
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          // console.log("input", input);
          // console.log("name", name);
          // console.log("checked", checked);

          const checked = input.checked;
          // console.log(index);index =0 =>admin, index=1+>quan ly noi dug
          if (checked) {
            console.log("a", permissions);
            permissions[index]?.permissions?.push(name);
          }
        });
      }
    });

    // GUI 1 MANG CHO BACKEND PHAI GUI QUA FORM
    // ?luu data vao form roi gui
    console.log(permissions);
    if (permissions.length > 0) {
      // luu vao tron input form
      const formChangePermissions = document.querySelector(
        "#form-change-permissions"
      );
      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']"
      );
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}

// logic value default permission
// backed đổ dâtaa ra cho view nhưng bên js cần lấy data đó(div ẩn chứa data)
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  // string to arr
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  console.log({ records });
  const tablePermissions = document.querySelector("[table-permissions]");
  // lấy ra bảng ròi găp qua từng dòng để insert data
  records.forEach((record, index) => {
    // lap qua tung object để lấy từng bản ghi => lấy all quyềnquyền

    const permissions = record?.permissions;
    // 2 permission
    console.log(permissions);
    permissions?.forEach((permission) => {
      // lấy ra từng quyền, kiểm tra từng permission ứng với index nào
      console.log(permission);
      console.log(index);

      // tìm các row có name trùng với name đang cần(tên các quyền)
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);

      // ví dụ tìm hàng có tên là products-category-views rồi tìm vào ô input có index=0 hoặc 1 rồi add checked
      const input = row.querySelectorAll("input"); // tra ra 2 o input
      // timf ra o input da checked
      input[index].checked = true;
    });
  });
}
