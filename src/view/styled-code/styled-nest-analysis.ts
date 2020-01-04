import { TokenStateMachine } from "../../libs/state-machine";

type State =
  | "storeKeys"
  | "startSubObject"
  | "endSubObject"
  | "keySplit"
  | "ignore"
  | "empty";

type Tokens =
  | {
      type: "key";
      value: string;
    }
  | {
      type: "startObject";
    }
  | {
      type: "endObject";
    };

const getObjectTokensFromString = TokenStateMachine<State, Tokens>(
  "storeKeys",
  tokens => {
    let currentStoreKey = "";
    const takeStoreKeys = () => {
      if (currentStoreKey) {
        tokens.push({
          type: "key",
          value: currentStoreKey,
        });
        currentStoreKey = "";
      }
    };
    return {
      startSubObject: {
        lastState: /.*/,
        currentKey: "{",
        action: data => {
          takeStoreKeys();
          tokens.push({
            type: "startObject",
          });
        },
      },
      keySplit: {
        lastState: ["storeKeys", "empty"],
        currentKey: ",",
        action: data => {
          takeStoreKeys();
        },
      },
      storeKeys: {
        lastState: /.*/,
        currentKey: /\w/,
        action: data => {
          if (data.lastState == "ignore") {
            return "ignore";
          }
          if (data.lastState === "empty") {
            currentStoreKey = data.currentKey;
          } else {
            currentStoreKey += data.currentKey;
          }
          return;
        },
      },
      endSubObject: {
        lastState: /.*/,
        currentKey: "}",
        action: data => {
          takeStoreKeys();
          tokens.push({
            type: "endObject",
          });
        },
      },
      ignore: {
        lastState: /.*/,
        currentKey: /\./,
      },
      empty: {
        lastState: /.*/,
        currentKey: /\W/,
      },
    };
  }
);

export function readTokensAsObj(tokens: Tokens[]) {
  let cur = {} as object;
  const parent: object[] = [];
  let lastKey = "";
  tokens.forEach(token => {
    switch (token.type) {
      case "startObject":
        if (lastKey) {
          parent.push(cur);
          cur[lastKey] = {};
          cur = cur[lastKey];
        }
        break;
      case "key":
        cur[token.value] = token.value;
        lastKey = token.value;
        break;
      case "endObject":
        cur = parent.pop() || cur;
        break;
    }
  });
  console.log(cur);
  return cur;
}
export default function(str: string) {
  return readTokensAsObj(getObjectTokensFromString(str));
}
