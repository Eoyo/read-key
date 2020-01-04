import App from "./app-framework/App";
import StyledCode from "./styled-code/StyledCode";
import GitCommit from "./single-transform/GitCommit";
import KeyValue from "./single-transform/KeyValue";
import SnippetsRefine from "./single-transform/SnippetsRefine";

export default function initView() {
  const app = new App();
  const styledCode = new StyledCode();

  // 清理 git commit 中复制的额外信息
  app.addOneItem("git-commit", GitCommit.dom);
  app.addOneItem("snippets-refine", SnippetsRefine.dom);
  // 将 keyValue 对象转换成 postman 的 bulk edit 文本
  app.addOneItem("keyValue", KeyValue.dom);
  app.addOneItem("StyledCode", styledCode.dom);

  document.body.append(app.dom);
}
