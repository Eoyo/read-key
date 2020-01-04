export default function extendsFunc (func: Function | undefined, func2: () => void) {
  if (func) {
    return () => {
      func();
      func2();
    };
  } else {
    return func2;
  }
}
