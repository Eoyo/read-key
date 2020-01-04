import SingleTransform from "./single-transform";

export default new SingleTransform({
  placeholder: "将代码转换为标准的 Snippets",
  transForm: (str = "") => {
    let rus = '"prefix" : "" \n, "body" : [\n"';
    for (let x of str) {
      switch (x) {
        case "\n":
          rus += '"\n,"';
          break;
        case "\t":
          rus += "\\r";
          break;
        case '"':
          rus += '\\"';
          break;
        default:
          rus += x;
      }
    }
    rus += '"\n]';
    return rus;
  },
});
