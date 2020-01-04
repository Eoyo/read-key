import SingleTransform from "./single-transform";
import S from "../../libs/js-string/string-doctor";

export default new SingleTransform({
  placeholder: "转换 git lab 中的复制的git commit 为 简洁的markdown 文本",
  transForm: (v: string) =>
    S.splitLine(v)
      .filter(S.isGitCommit)
      .map(S.addListHead)
      .join("\n"),
});
