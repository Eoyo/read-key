import s from "./single-transform.css";
import cssDom from "nested-ele/dist/libs/css-dom";
import { DataDom } from "nested-ele/dist/libs/data-dom";

const e = cssDom(s)({ textarea: "textarea", button: "button" });

export default class SingleTransform extends DataDom<{
  transForm: (str: string) => string;
  placeholder?: string;
}> {
  inputText = e.textarea({
    placeholder: this.props.placeholder,
    oninput: () => {
      this.outputText.value = this.props.transForm(this.inputText.value);
    },
  });
  outputText = e.textarea();
  dom = e.wrapper(this.inputText, this.outputText);
}
