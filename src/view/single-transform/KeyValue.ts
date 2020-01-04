import SingleTransform from "./single-transform";

export default new SingleTransform({
  placeholder: "将 key-values 数组转换为 POST man 的参数编辑",
  transForm: function getBulkEdit(str: string) {
    const values = JSON.parse(str) as any[];
    return values.reduce((acc, a) => {
      return acc + a.key.replace(":", "-") + ":" + a.value + "\n";
    }, "");
  },
});
