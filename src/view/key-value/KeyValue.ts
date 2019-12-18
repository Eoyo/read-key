import s from "./KeyValue.css";
import cssDom from "nested/dist/libs/css-dom";

const e = cssDom(s)({ textarea: "textarea", button: "button" });
function getBulkEdit(str: string) {
  const values = JSON.parse(str) as any[];
  return values.reduce((acc, a) => {
    return acc + a.key.replace(":", "-") + ":" + a.value + "\n";
  }, "");
}
export default class KeyValues {
  text = e.textarea();
  dom = e.wrapper(
    e.button(
      {
        onclick: () => {
          this.text.value = getBulkEdit(this.text.value);
        }
      },
      "转换"
    ),
    this.text
  );
}
