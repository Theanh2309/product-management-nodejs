let count = 0
const createTree = (arr, parentId = "")=>{
  // console.log("Input array:", arr); //17 record

  const tree = [];
  arr.forEach(item => {
//     console.log("Processing item:", item);
// console.log("Matching parentId:", parentId);

    // So sánh dạng chuỗi
    if (String(item.parent_id) === String(parentId)) {
      count++
      const newItem = { ...item }; // Tạo bản sao object
      newItem.index = count;
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
  count =0;
const tree = createTree(arr, parentId = "");

return tree;
}