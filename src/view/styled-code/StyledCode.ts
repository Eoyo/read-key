import s from "./StyledCode.css";
import cssDom from "nested-ele/dist/libs/css-dom";
import buildStyledString from "./build-styled-string";

const e = cssDom(s)({
  outputTextarea: "textarea",
  inputTextarea: "textarea",
  button: "button",
});

export default class StyledCode {
  text = e.inputTextarea({
    placeholder: "将 styled 转换为 react 的代码",
    oninput: (ev) => {
      this.setStyledCode(this.text.value);
      console.log(ev);
    },
  });
  importCode = e.outputTextarea();
  styledCode = e.outputTextarea();
  jsonCode = e.outputTextarea();
  renderCode = e.outputTextarea();

  setStyledCode(str: string) {
    const code = buildStyledString(str);
    this.renderCode.value = code.renderCode;
    this.importCode.value = code.importCode;
    this.styledCode.value = code.styledCode;
    this.jsonCode.value = code.jsonValue;
  }

  dom = e.wrapper(
    this.text,
    e.output(this.styledCode, this.renderCode, this.importCode, this.jsonCode)
  );
}
