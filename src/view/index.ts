import App from "./app-framework/App";
import GitCommit from "./git-commit/GitCommit";
import Nested from "nested";
import KeyValues from "./key-value/KeyValue";

const Text = Nested.createElement("text");

export default function initView() {
  const app = new App();
  const gitCommit = new GitCommit();
  const keyValue = new KeyValues();

  // 清理 git commit 中复制的额外信息
  app.addOneItem("git-commit", gitCommit.dom);

  // 将 keyValue 对象转换成 postman 的 bulk edit 文本
  app.addOneItem("keyValue", keyValue.dom);

  document.body.append(app.dom);
}
