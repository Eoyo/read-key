import s from "./KeyValue.css";
import cssDom from "nested/dist/libs/css-dom";

const e = cssDom(s)({});
const values = [
  {
    key: "OSSAccessKeyId",
    value: "LTAI4gvNbAt0Hvya"
  },
  {
    key: "policy",
    value:
      "eyJleHBpcmF0aW9uIjoiMjAxOS0xMi0xN1QwODo1OTo0MS45OTNaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIm1pbmRsaW5rZXItdGVzdC8iXV19"
  },
  {
    key: "Signature",
    value: "1rk4JAAoh/CTKAuo+PEA4v9yhf4="
  },
  {
    key: "key",
    value: "mindlinker-test/8972cc5c2b78454b8234dc4a79610282"
  },
  {
    key: "callback",
    value:
      "eyJjYWxsYmFja0JvZHkiOiJidWNrZXQ9JHtidWNrZXR9Jm9iamVjdD0ke29iamVjdH0mc2l6ZT0ke3NpemV9JmFwcGlkPSR7eDphcHBpZH0mYnVja2V0aWQ9JHt4OmJ1Y2tldGlkfSZzZXNzaW9uaWQ9JHt4OnNlc3Npb25pZH0mZGV2aWNlX21vZGVsPSR7eDpkZXZpY2VfbW9kZWx9JmVtYWlsPSR7eDplbWFpbH0mcGhvbmVfbnVtYmVyPSR7eDpwaG9uZV9udW1iZXJ9Jm1lZXRpbmdfbm89JHt4Om1lZXRpbmdfbm99JnVzZXJfbmFtZT0ke3g6dXNlcl9uYW1lfSZkZXZpY2VfdmVyc2lvbj0ke3g6ZGV2aWNlX3ZlcnNpb259JmFwcF92ZXJzaW9uPSR7eDphcHBfdmVyc2lvbn0mc3BhY2VfaWQ9JHt4OnNwYWNlX2lkfSZ0b2tlbj0ke3g6dG9rZW59IiwiY2FsbGJhY2tCb2R5VHlwZSI6ImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCIsImNhbGxiYWNrVXJsIjoiaHR0cDovL2NzdG9yZS50ZXN0LnNlZXdvLmNvbS9jc3RvcmVfY2IvdjIvYWxpeXVuP2FwcGlkPTEwMjEzJnNlc3Npb25pZD02NmZhY2Y0MWM5MjE0NjdjYjE1OWJmY2RiNDlmYzA0MyJ9"
  },
  {
    key: "success_action_status",
    value: "200"
  },
  {
    key: "x:appid",
    value: "10213"
  },
  {
    key: "x:sessionid",
    value: "66facf41c921467cb159bfcdb49fc043"
  },
  {
    key: "x:bucketid",
    value: "48"
  }
];

export default class KeyValues {
  dom = e.wrapper(
    values.reduce((acc, a) => {
      return acc + a.key.replace(":", "-") + ":" + a.value + "\n";
    }, "")
  );
}
