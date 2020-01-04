// 自动取消上一次setTimeout 的 时间管理;
export default class TimeManager<Value> {
  private timeOutId: number | undefined = undefined;
  private value: Value | undefined;
  constructor(private time: number) {}
  clear() {
    if (typeof this.timeOutId === "number") {
      clearTimeout(this.timeOutId);
    }
    this.timeOutId = undefined;
  }
  setTimeout(func: (va: Value | undefined) => void) {
    if (this.timeOutId !== undefined) {
      this.clear();
    }
    // node js 中setTimeOut的返回值不一样
    this.timeOutId = setTimeout(() => {
      func(this.value);
    }, this.time) as any;
  }
  setMemory(va: Value) {
    this.value = va;
    return this;
  }
  getMemory() {
    return this.value;
  }
}
