module.exports = (query) => {
  // Định nghĩa các trạng thái bộ lọc
  let filtersStatus = [
    {
      name: "Tat ca",
      status: "",
      class: "",
    },
    {
      name: "Hoat dong",
      status: "active",
      class: "",
    },
    {
      name: "dung hoat dong",
      status: "inactive",
      class: "",
    },
  ];

  if (query.status) {
    const index = filtersStatus.findIndex((item) => {
      return item.status == query.status;
    });

    filtersStatus[index].class = "active";
  } else {
    const index = filtersStatus.findIndex((item) => {
      return item.status == "";
    });
    filtersStatus[index].class = "active";
  }

  return filtersStatus;
};
