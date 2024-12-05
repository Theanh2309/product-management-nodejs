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
