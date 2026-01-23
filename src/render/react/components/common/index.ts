import * as React from "react";
import {
  EAlignType,
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
} from "../config";
import { StyleProps } from "../../core/style";

export type CommonProps = {
  style?: StyleProps;
  /** Align takes priority over  */
  align?: {
    type?: typeof EAlignType[keyof typeof EAlignType];
    /** Defines the x,y position */
    pos?: [number, number];
  };
  alignTo?: {
    type?: typeof EAlignType[keyof typeof EAlignType];
    /** Defines the x,y position */
    pos?: [number, number];
    /** Pass the component instance by React ref */
    parent: any;
  };
  scrollbarStyle?: StyleProps;
  onScrollbarPressedStyle?: StyleProps;
  scrollbarScrollingStyle?: StyleProps;
  onPressedStyle?: StyleProps;
  onReleasedStyle?: StyleProps;
  children?: React.ReactNode;
  onClick?: (event: OnClickEvent) => void;
  onPressed?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onLongPressed?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onLongPressRepeat?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onPressLost?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onReleased?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onCancel?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onFocusedStyle?: StyleProps;
  addToFocusGroup?: boolean;
  autoFocus?: boolean;
};

export type OnChangeEvent = {
  target: any,
  currentTarget: any,
  stopPropogation: () => void,
  value: number,
  checked?: boolean,
}

export type OnClickEvent = {
  target: any,
  currentTarget: any,
  stopPropogation: () => void,
}

export const commonSetters = {
  style(comp, styleSheet, compName, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName,
      styleType: STYLE_TYPE.PART_MAIN,
      oldStyleSheet: oldProps.style,
    });
  },
  align(comp, { type, pos = [0, 0] }, newProps, oldProps) {
    if (
      !type ||
      (type === oldProps.align?.type &&
        newProps.align?.pos?.[0] === oldProps.align?.pos?.[0] &&
        newProps.align?.pos?.[1] === oldProps.align?.pos?.[1])
    )
      return;
    comp.align(type, pos);
  },
  alignTo(comp, { type, pos = [0, 0], parent }, newProps, oldProps) {
    if (
      !type ||
      (type === oldProps.alignTo?.type &&
        newProps.alignTo?.pos?.[0] === oldProps.alignTo?.pos?.[0] &&
        newProps.alignTo?.pos?.[1] === oldProps.alignTo?.pos?.[1] &&
        parent?.uid === oldProps.alignTo?.parent?.uid)
    )
      return;
    comp.alignTo(type, pos, parent);
  },
  scrollbarStyle(comp, styleSheet, compName, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName,
      styleType: STYLE_TYPE.PART_SCROLLBAR,
      oldStyleSheet: oldProps.scrollbarStyle,
    });
  },
  onScrollbarPressedStyle(comp, styleSheet, compName, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName,
      styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onScrollbarPressedStyle,
    });
  },
  onScrollbarScrollingStyle(comp, styleSheet, compName, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName,
      styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_SCROLLED,
      oldStyleSheet: oldProps.scrollbarScrollingStyle,
    });
  },
  onPressedStyle(comp, styleSheet, compName, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName,
      styleType: STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onPressedStyle,
    });
  },
  onClick(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
  },
  onPressed(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
  },
  onLongPressed(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
  },
  onLongPressRepeat(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
  },
  onPressLost(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESS_LOST);
  },
  onReleased(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_RELEASED);
  },
  onCancel(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CANCEL);
  },
  onFocusedStyle(comp, styleSheet, compName, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName,
      styleType: STYLE_TYPE.STATE_FOCUSED,
      oldStyleSheet: oldProps.onFocusedStyle,
    });
  },
  addToFocusGroup(comp, v) {
    if (v) comp.addToFocusGroup?.();
  },
  autoFocus() {
    // handled in commitMount
  },
};

export function setComponentProps(
  comp: any,
  compName: string,
  newProps: any,
  oldProps: any,
  componentSetters: Record<string, Function>
) {
  for (const key in newProps) {
    const setter = componentSetters[key] || commonSetters[key];
    if (!setter) continue;
    if (setter.length === 0) {
      setter();
    } else if (setter.length === 2) {
      setter(comp, newProps[key]);
    } else if (setter.length === 3) {
      setter(comp, newProps[key], oldProps);
    } else if (setter.length === 4) {
      setter(comp, newProps[key], compName, oldProps);
    } else if (setter.length === 5) {
      setter(comp, newProps[key], newProps, oldProps);
    } else {
      setter();
    }
  }
  
  comp.dataset = {};
  for (const prop in newProps) {
    if (prop.indexOf("data-") === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  }
}

export function reorderProps<T extends object>(props: T, priorityKey: keyof T & string): T {
  if (props && priorityKey in props) {
    const { [priorityKey]: priorityValue, ...rest } = props;
    return { [priorityKey]: priorityValue, ...rest } as T;
  }

  return props;
}