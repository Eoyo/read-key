import cssDom from "nested/dist/libs/css-dom";
import setActiveClassName from "nested/dist/libs/set-active-class-name";
import appCss from "./App.css";
import decorateCss from "./decorator.css";

const e = cssDom(appCss)({});

export default class App {
  menu = e.menu();
  emptyContent = document.createComment("page content");
  pageContent = e.pageContent(this.emptyContent);
  dom = e.wrapper(this.menu, this.pageContent);
  pages: HTMLElement[] = [];
  addOneItem(text: string, page: HTMLElement) {
    const item = e.menuItem(
      {
        onclick: () => {
          this.focusTag(text, item, page);
        }
      },
      text
    );
    this.menu.append(item);
  }
  private lastFocusItem: HTMLElement | null = null;
  private focusTag(tag: string, item: HTMLElement, page: HTMLElement) {
    this.lastFocusItem = setActiveClassName(
      decorateCss["active-bar"],
      item,
      this.lastFocusItem
    );
    this.pageContent.replaceChild(page, this.pageContent.childNodes[0]);
  }
}
