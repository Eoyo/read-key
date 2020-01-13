import SingleTransform from "./single-transform";

export default new SingleTransform({
  placeholder: "将代码转换为标准的 Snippets",
  transForm: (str = "") => {
    const indent1 = "    ";
    const indent2 = "      ";
    let rus = `${indent1}"prefix" : "",\n${indent1}"body" : [\n${indent2}"`;
    for (let x of str) {
      switch (x) {
        case "\n":
          rus += `"\n${indent2},"`;
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
    rus += `"\n${indent1}],`;
    return rus;
  },
});
