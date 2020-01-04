export function match(matcher: RegExp | string[] | string, key: string) {
  if (Array.isArray(matcher)) {
    return matcher.includes(key);
  } else if (typeof matcher === "string") {
    return matcher == key;
  } else if (matcher instanceof RegExp) {
    return matcher.test(key);
  } else {
    return matcher === key;
  }
}
/**
 * 构造一个队字符进行分词的状态机
 * @param defaultInitState 默认的状态机的状态
 * @param createState 状态图的构建, 以及关键运行节点的返回值
 */
export function TokenStateMachine<S extends string, Tokens>(
  defaultInitState: S,
  stateSwitch: (
    tokens: Tokens[]
  ) => {
    [x in S]: {
      lastState: S[] | RegExp;
      currentKey: string | RegExp;
      action?: (data: { currentKey: string; lastState: S }) => void | S;
    }
  }
): (code: string, initState?: S) => Tokens[] {
  return (code, initState = defaultInitState) => {
    const tokens: Tokens[] = [];
    const state = stateSwitch(tokens);
    // 解构成表格
    const Values = Object.keys(state).map((stateName) => {
      return {
        state: stateName as S,
        value: state[stateName as S],
      };
    });
    let currentState = initState;
    for (const c of code) {
      const foundNode = Values.find(node => {
        return (
          match(node.value.currentKey, c) &&
          match(node.value.lastState, currentState)
        );
      });
      if (foundNode) {
        // 触发匹配的节点的 actions;
        if (foundNode.value.action) {
          currentState =
            foundNode.value.action({
              currentKey: c,
              lastState: currentState,
            }) || foundNode.state;
        } else {
          currentState = foundNode.state;
        }
      }
    }
    return tokens;
  };
}
