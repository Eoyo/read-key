import styledNestAnalysis from "./styled-nest-analysis";
import objectTokens, { ObjTokens } from "../../libs/js-object/object-tokens";

function combinePath(path = "", nextPath = "") {
  return path + nextPath;
}

const PartReg = /(Foot)|(Sider)|(Header)|(Content)$/;
const SideReg = /^(Top)|(Bottom)|(Left)|(Right)/;
function getNextPath(path = "", nextPath = "") {
  switch (true) {
    case PartReg.test(nextPath):
    case SideReg.test(nextPath):
      return "";
    default:
      return combinePath(path, nextPath);
  }
}

function buildOneStyled(one: string) {
  return `export const ${one} = styled("div")\`\n  --styled: "${one}";\n  \n\``;
}

function buildNeedStyledWords(A: any) {
  // 记录复合出来的单词
  const words: string[] = [];

  // 更新 obj 的 key ;
  function build(obj: any, path: string, isFirst = false) {
    const newObj: any = {};
    for (const x in obj) {
      // 下一层的前缀;
      const newPath = getNextPath(path, x);

      // 复合单词
      let pathKey = combinePath(path, x);

      // 对没有复合的单词打上Wrapper标记
      pathKey += x === pathKey && isFirst ? "Wrapper" : "";

      words.push(pathKey);
      if (typeof obj[x] === "object") {
        newObj[pathKey] = build(obj[x], newPath);
      } else {
        newObj[pathKey] = newPath;
      }
    }
    return newObj;
  }

  const obj = build({ ...A }, "", true);
  return {
    obj,
    words,
  };
}

class RenderCodeTree {
  private code = "";
  private nodeStack: string[] = [];
  private indentSize: number = 0;
  private needCloseNode = "";
  openNode(node: string) {
    // 打开新的节点, 关闭旧的没有关闭的节点.
    if (this.needCloseNode) {
      this.closeNode();
    }
    this.addNodeStart(node);
    this.needCloseNode = node;
  }
  closeNode() {
    if (this.needCloseNode) {
      this.addNodeEnd(this.needCloseNode);
    }
    // 将需求关闭的清空, 表示无需 close 了;
    this.needCloseNode = "";
  }
  pushIndent() {
    this.pushLastNode();
    this.indentSize += 2;
  }
  popIndent() {
    // 关闭当前的子节点
    this.closeNode();
    this.popLastNode();
    this.indentSize -= 2;
    // 退掉了空格后关闭父节点
    this.closeNode();
  }
  private pushLastNode() {
    this.nodeStack.push(this.needCloseNode);
    this.needCloseNode = "";
  }
  private popLastNode() {
    this.needCloseNode = this.nodeStack.pop() || "";
  }
  private addNodeStart(node: string) {
    this.insertIndent();
    this.code += `<${node}>`;
  }
  private addNodeEnd(node: string) {
    this.insertIndent();
    this.code += `</${node}>`;
  }
  private insertIndent() {
    // 保证了第一次添加的时候没有换行
    if (this.indentSize || this.code) {
      this.code += "\n" + " ".repeat(this.indentSize);
    }
  }
  getCode() {
    // 如果有标签没有关闭则触发关闭
    this.closeNode();
    return this.code;
  }
}

export default function(originString: string) {
  const obj = styledNestAnalysis(originString);
  const code = buildNeedStyledWords(obj);
  const tokens = objectTokens(code.obj);
  const renderCode = new RenderCodeTree();

  tokens.forEach((one) => {
    switch (one.type) {
      case ObjTokens.DefineProperty:
        renderCode.openNode(one.key);
        break;

      case ObjTokens.ObjectStart:
        renderCode.pushIndent();
        break;
      case ObjTokens.ObjectEnd:
        renderCode.popIndent();
        break;
    }
  });
  const name = Object.keys(obj)[0];
  const importReact = `import * as React from "react"`;
  const words = code.words.join(",\n ");
  const importHeader = `import { ${words}} from "./${name}.styled";`;
  const exportProps = `export type ${name}Props = {}`;
  const exportFn = (c: string) =>
    `export default function ${name} ({  }: ${name}Props) {\n return ${c};\n}`;
  const importCode = `${importHeader}\n${importReact}\n\n${exportProps}\n`;

  return {
    jsonValue: JSON.stringify(obj, null, 4),
    styledCode: `import styled, { css } from "styled-components";\n\n${originString}\n\n${code.words
      .map(buildOneStyled)
      .join(";\n\n")}\n`,
    renderCode: importCode + exportFn(renderCode.getCode()),
    importCode,
  };
}
