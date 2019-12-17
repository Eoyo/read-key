import s from "./GitCommit.css";
import cssDom from "nested/dist/libs/css-dom";
import S from "../../libs/js-string/string-doctor";

const getNewCommit = (v: string) =>
  S.splitLine(v)
    .filter(S.isGitCommit)
    .map(S.addListHead)
    .join("\n");

const e = cssDom(s)({ textarea: "textarea", button: "button" });
export default class GitCommit {
  text = e.textarea();
  dom = e.wrapper(
    e.button(
      {
        onclick: () => {
          this.text.value = getNewCommit(this.text.value);
        }
      },
      "转换"
    ),
    this.text
  );
}
