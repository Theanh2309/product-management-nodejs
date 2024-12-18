const { default: mongoose } = require("mongoose");
// nhóm quyền chứa các quyền
const roleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: { type: [String], default: [] }, // Mảng các quyền dưới dạng chuỗi
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }, // Date sẽ là null khi không bị xóa
  },
  {
    timestamps: true,
  }
);
const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;
