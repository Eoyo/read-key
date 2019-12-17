/**
 * StringDoctor 的接口函数 - 用于限制创建的对象字面量的类型
 * @param f
 */
function StringDoctor<
  F extends {
    [x: string]: (str: string) => string | string[] | boolean;
  }
>(f: F): F {
  return f;
}

const C = {
  listHead: "- ",
  line: "\n",
  commitHead: /\[\w+\]/
};

const S = StringDoctor({
  splitLine(s) {
    return s.split(C.line);
  },
  addListHead(s) {
    if (s.slice(0, 2) !== C.listHead) {
      return `${C.listHead}${s}`;
    }
    return s;
  },
  isGitCommit(s) {
    return C.commitHead.test(s);
  }
});

export default S;
