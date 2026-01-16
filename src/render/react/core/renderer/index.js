import reconciler from "../reconciler";

class RootContainer {
  constructor() {
    this.children = [];
  }
  add(child) {
    const idx = this.children.indexOf(child);
    if (idx === -1) this.children.push(child);
  }
  insertBefore(child, beforeChild) {
    // Ensure stable ordering semantics for reconciler
    const curIdx = this.children.indexOf(child);
    if (curIdx !== -1) this.children.splice(curIdx, 1);

    const beforeIdx = this.children.indexOf(beforeChild);
    if (beforeIdx === -1) {
      this.children.push(child);
    } else {
      this.children.splice(beforeIdx, 0, child);
    }
  }
  delete(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) this.children.splice(idx, 1);
  }
}

export class Renderer {
  static container;
  static portalContainer;

  static render(element, options) {
    const isConcurrent = false;
    const hydrate = false;
    const containerInfo = new RootContainer();

    Renderer.container = reconciler.createContainer(
      containerInfo,
      isConcurrent,
      hydrate,
    );

    const parentComponent = null;
    reconciler.updateContainer(element, Renderer.container, parentComponent);
  }
}
