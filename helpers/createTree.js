const createTree = (arr, parentId = "")=>{
  const tree = [];
  arr.forEach(item => {
    // So sánh dạng chuỗi
    if (String(item.parent_id) === String(parentId)) {
      const newItem = { ...item }; // Tạo bản sao object
      const children = createTree(arr, String(item._id)); 
      // Truyền `_id` dưới dạng chuỗi
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}
module.exports.tree =(arr, parentId = "")=>{
const tree = createTree(arr, parentId = "");
return tree;
}