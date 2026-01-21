import { StyleProps } from "../../core/style";
import { setComponentProps, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeView = bridge.NativeRender.NativeComponents.Textarea;

export type TextAreaProps = CommonProps & {
  placeholder: string;
  /** `password` mode changes text to `*` */
  mode?: "password" | "text";
  onFocusStyle: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  onFocus?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  value: string;
  /** Virtual keyboard will auto raise up when focus on Input component */
  autoKeyBoard: boolean;
};

const textareaSetters = {
  placeholder(comp, str, oldProps) {
    if (str !== oldProps.placeholder) {
      comp.setPlaceHolder(str);
    }
  },
  mode(comp, mode, oldProps) {
    if (mode === "password") {
      comp.setPasswordMode(true);
    } else if (oldProps.mode === "password") {
      comp.setPasswordMode(false);
    }
  },
  onFocusStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Textarea",
      styleType: 0x0002,
      oldStyleSheet: oldProps.onFocusStyle,
    });
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
  onFocus(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
  },
  value(comp, str, oldProps) {
    if (str !== oldProps.value) {
      comp.setText(str);
    }
  },
  autoKeyBoard(comp, payload, oldProps) {
    if (payload !== oldProps?.autoKeyBoard) {
      comp.setAutoKeyboard(payload);
    }
  },
};

export class TextareaComp extends NativeView {
  uid: string;
  style: any;
  
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    super.setOneLine(false);

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
  setProps(newProps: TextAreaProps, oldProps: TextAreaProps) {
    setComponentProps(this, "Textarea", newProps, oldProps, textareaSetters);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
  close() {}
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Textarea",
      styleType: type,
      oldStyleSheet: {},
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
