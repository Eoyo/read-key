export enum ObjTokens {
  DefineProperty = "DefineProperty",
  ObjectStart = "ObjectStart",
  ObjectEnd = "ObjectEnd",
}

type DefineToken = {
  type: ObjTokens.DefineProperty;
  key: string;
  value: any;
};

type ObjectStartToken = {
  type: ObjTokens.ObjectStart;
};

type ObjectEndToken = {
  type: ObjTokens.ObjectEnd;
};

type Token = DefineToken | ObjectStartToken | ObjectEndToken;

/**
 * 对对象进行词法分割
 * 得到了这个对象的深度遍历的描述数组.
 */
export default function(obj: object) {
  const tokens: Token[] = [];
  function build(obj: any) {
    if (typeof obj === "object") {
      tokens.push({
        type: ObjTokens.ObjectStart,
      });
      for (const x in obj) {
        tokens.push({
          type: ObjTokens.DefineProperty,
          key: x,
          value: obj[x],
        });
        build(obj[x]);
      }
      tokens.push({
        type: ObjTokens.ObjectEnd,
      });
    } else {
      return;
    }
  }
  for (const x in obj) {
    tokens.push({
      type: ObjTokens.DefineProperty,
      key: x,
      value: obj[x],
    });
    build(obj[x]);
  }
  return tokens;
}
