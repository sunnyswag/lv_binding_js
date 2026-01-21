import { StyleProps } from "../../core/style";
import { colorTransform } from "../../core/style/color";
import { setComponentProps, CommonProps } from "../common/index";
import {
  STYLE_TYPE,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeChart = bridge.NativeRender.NativeComponents.Chart;

const chartType = {
  none: 0,
  line: 1,
  bar: 2,
  scatter: 3,
};

export type ChartProps = CommonProps & {
  onPressedStyle?: StyleProps;
  indicatorStyle?: StyleProps;
  pointStyle?: StyleProps;
  itemStyle?: StyleProps;
  type?: string;
  divLineCount?: [number, number];
  pointNum?: number;
  scatterData?: any[];
  leftAxisOption?: any;
  leftAxisData?: any[];
  bottomAxisOption?: any;
  bottomAxisData?: any[];
  rightAxisOption?: any;
  rightAxisData?: any[];
  topAxisOption?: any;
  topAxisData?: any[];
  leftAxisLabels?: any[];
  rightAxisLabels?: any[];
  topAxisLabels?: any[];
  bottomAxisLabels?: any[];
  leftAxisRange?: [number, number];
  rightAxisRange?: [number, number];
  topAxisRange?: [number, number];
  bottomAxisRange?: [number, number];
};

const chartSetters = {
  onPressedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Chart",
      styleType: STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onPressedStyle,
    });
  },
  indicatorStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Chart",
      styleType: STYLE_TYPE.PART_INDICATOR,
      oldStyleSheet: oldProps.indicatorStyle,
    });
  },
  itemStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Chart",
      styleType: STYLE_TYPE.PART_ITEMS,
      oldStyleSheet: oldProps.itemStyle,
    });
  },
  type(comp, type) {
    if (chartType[type] !== void 0) {
      comp.setType(chartType[type]);
    }
  },
  divLineCount(comp, arr, oldProps) {
    if (
      arr?.[0] !== oldProps?.divLineCount?.[0] ||
      arr?.[1] !== oldProps?.divLineCount?.[1]
    ) {
      comp.setDivLineCount(arr);
    }
  },
  pointNum(comp, num, oldProps) {
    if (num !== oldProps?.pointNum) {
      comp.setPointNum(num);
    }
  },
  scatterData(comp, data, oldProps) {
    if (data !== oldProps?.scatterData) {
      data = data.map((item) => {
        const arr = [];
        item.data.forEach((item1) => {
          arr.push(item1[0]);
          arr.push(item1[1]);
        });
        return {
          color: item.color === void 0 ? -1 : colorTransform(item.color),
          data: arr,
        };
      });
      comp.setScatterData(data);
    }
  },
  leftAxisOption(comp, options, oldProps) {
    if (
      options.majorLen == void 0 ||
      options.minorLen == void 0 ||
      options.majorNum == void 0 ||
      options.minorNum == void 0 ||
      !options.drawSize
    ) {
      return;
    }
    if (options != oldProps?.leftAxisOption) {
      comp.setLeftAxisOption(options);
    }
  },
  leftAxisData(comp, data, oldProps) {
    if (data !== oldProps?.leftAxisData) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setLeftAxisData(data);
    }
  },
  bottomAxisOption(comp, options, oldProps) {
    if (
      options.majorLen == void 0 ||
      options.minorLen == void 0 ||
      options.majorNum == void 0 ||
      options.minorNum == void 0 ||
      !options.drawSize
    ) {
      return;
    }
    if (options != oldProps?.bottomAxisOption) {
      comp.setBottomAxisOption(options);
    }
  },
  bottomAxisData(comp, data, oldProps) {
    if (data !== oldProps?.bottomAxisData) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setBottomAxisData(data);
    }
  },
  rightAxisOption(comp, options, oldProps) {
    if (
      options.majorLen == void 0 ||
      options.minorLen == void 0 ||
      options.majorNum == void 0 ||
      options.minorNum == void 0 ||
      !options.drawSize
    ) {
      return;
    }
    if (options != oldProps?.rightAxisOption) {
      comp.setRightAxisOption(options);
    }
  },
  rightAxisData(comp, data, oldProps) {
    if (data !== oldProps?.rightAxisData) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setRightAxisData(data);
    }
  },
  topAxisOption(comp, options, oldProps) {
    if (
      options.majorLen == void 0 ||
      options.minorLen == void 0 ||
      options.majorNum == void 0 ||
      options.minorNum == void 0 ||
      !options.drawSize
    ) {
      return;
    }
    if (options != oldProps?.topAxisOption) {
      comp.setTopAxisOption(options);
    }
  },
  topAxisData(comp, data, oldProps) {
    if (data !== oldProps?.topAxisData) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setTopAxisData(data);
    }
  },
  leftAxisLabels(comp, arr, oldProps) {
    if (arr !== oldProps?.leftAxisLabels) {
      comp.setLeftAxisLabels(arr);
    }
  },
  rightAxisLabels(comp, arr, oldProps) {
    if (arr !== oldProps?.rightAxisLabels) {
      comp.setRightAxisLabels(arr);
    }
  },
  topAxisLabels(comp, arr, oldProps) {
    if (arr !== oldProps?.topAxisLabels) {
      comp.setTopAxisLabels(arr);
    }
  },
  bottomAxisLabels(comp, arr, oldProps) {
    if (arr !== oldProps?.bottomAxisLabels) {
      comp.setBottomAxisLabels(arr);
    }
  },
  leftAxisRange(comp, arr, oldProps) {
    if (
      arr?.[0] !== oldProps?.leftAxisRange?.[0] ||
      arr?.[1] !== oldProps?.leftAxisRange?.[1]
    ) {
      comp.setLeftAxisRange(arr);
    }
  },
  rightAxisRange(comp, arr, oldProps) {
    if (
      arr?.[0] !== oldProps?.rightAxisRange?.[0] ||
      arr?.[1] !== oldProps?.rightAxisRange?.[1]
    ) {
      comp.setRightAxisRange(arr);
    }
  },
  topAxisRange(comp, arr, oldProps) {
    if (
      arr?.[0] !== oldProps?.topAxisRange?.[0] ||
      arr?.[1] !== oldProps?.topAxisRange?.[1]
    ) {
      comp.setTopAxisRange(arr);
    }
  },
  bottomAxisRange(comp, arr, oldProps) {
    if (
      arr?.[0] !== oldProps?.bottomAxisRange?.[0] ||
      arr?.[1] !== oldProps?.bottomAxisRange?.[1]
    ) {
      comp.setBottomAxisRange(arr);
    }
  },
};

export class ChartComp extends NativeChart {
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
  setProps(newProps: ChartProps, oldProps: ChartProps) {
    setComponentProps(this, "Chart", newProps, oldProps, chartSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Chart";
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
      compName: "Chart",
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
