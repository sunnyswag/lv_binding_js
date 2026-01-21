import { setComponentProps, CommonProps } from "../common/index";
import {
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeLine = bridge.NativeRender.NativeComponents.Line;

export type LineProps = CommonProps & {
  points: [number, number][];
};

const lineSetters = {
  points(comp, points, oldProps) {
    if (
      (Array.isArray(points) && points !== oldProps?.points) ||
      points?.length !== oldProps?.points?.length
    ) {
      comp.setPoints(points, points.length);
    }
  },
};

export class LineComp extends NativeLine {
  uid: string;
  style: any;
  
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    const style = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj, prop) {
        const propStr = String(prop);
        if (styleGetterProp.includes(propStr)) {
          return style[propStr].call(that);
        }
      },
    });
  }
  setProps(newProps: LineProps, oldProps: LineProps) {
    setComponentProps(this, "Line", newProps, oldProps, lineSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Line";
  appendInitialChild(child) {}
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Line",
      styleType: type,
      oldStyleSheet: null,
      isInit: false,
    });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
}
