import { StyleProps } from "../../core/style";
import { setComponentProps, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeArc = bridge.NativeRender.NativeComponents.Arc;

const modes = {
  normal: 0,
  symmetrical: 1,
  reverse: 2,
};

export type ArcProps = CommonProps & {
  indicatorStyle?: StyleProps;
  onIndicatorPressedStyle?: StyleProps;
  onPressedStyle?: StyleProps;
  knobStyle?: StyleProps;
  onKnobPressedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  range?: [number, number];
  value?: number;
  startAngle?: number;
  endAngle?: number;
  backgroundStartAngle?: number;
  backgroundEndAngle?: number;
  rotation?: number;
  mode?: "normal" | "symmetrical" | "reverse";
  changeRate?: number;
};

const arcSetters = {
  indicatorStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Arc",
      styleType: STYLE_TYPE.PART_INDICATOR,
      oldStyleSheet: oldProps.indicatorStyle,
    });
  },
  onIndicatorPressedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Arc",
      styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onIndicatorPressedStyle,
    });
  },
  onPressedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Arc",
      styleType: STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onPressedStyle,
    });
  },
  knobStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Arc",
      styleType: STYLE_TYPE.PART_KNOB,
      oldStyleSheet: oldProps.knobStyle,
    });
  },
  onKnobPressedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Arc",
      styleType: STYLE_TYPE.PART_KNOB | STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onKnobPressedStyle,
    });
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
  range(comp, arr, oldProps) {
    if (!Array.isArray(arr)) return;
    const [min, max] = arr;
    if (min === oldProps.range?.[0] && max === oldProps.range?.[1]) return;
    if (isNaN(min) || isNaN(max)) return;
    comp.setRange([min, max]);
  },
  value(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.value) return;
    comp.setValue(val);
  },
  startAngle(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.startAngle) return;
    comp.setStartAngle(val);
  },
  endAngle(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.endAngle) return;
    comp.setEndAngle(val);
  },
  backgroundStartAngle(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.backgroundStartAngle) return;
    comp.setBackgroundStartAngle(val);
  },
  backgroundEndAngle(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.backgroundEndAngle) return;
    comp.setBackgroundEndAngle(val);
  },
  rotation(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.rotation) return;
    comp.setRotation(val);
  },
  mode(comp, val, oldProps) {
    if (val !== oldProps.mode && typeof modes[val] !== "undefined") {
      comp.setMode(modes[val]);
    }
  },
  changeRate(comp, val, oldProps) {
    if (isNaN(val)) return;
    if (val == oldProps.changeRate) return;
    comp.setChangeRate(val);
  },
};

export class ArcComp extends NativeArc {
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
  setProps(newProps: ArcProps, oldProps: ArcProps) {
    setComponentProps(this, "Arc", newProps, oldProps, arcSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Arc";
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
      compName: "Arc",
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
