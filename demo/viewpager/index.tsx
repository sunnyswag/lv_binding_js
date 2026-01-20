import React, { useEffect, useMemo, useRef, useState } from "react";
import { AddChildToDefGroup, Button, Dimensions, Render, Text, View } from "lvgljs-ui";

const { width, height } = Dimensions.window;

/**
 * 纯 View + flex + scroll-snap 的 “ViewPager” demo
 *
 * - pager: 横向 flex 容器，可滚动
 * - page: 每页固定宽高，并开启 snappable
 * - 导航点: 底部一排小圆点 + prev/next 按钮（方便在没手势时测试）
 */
function App() {
  const pageCount = 4;
  const pagerRef = useRef<any>();
  const pageRefs = useRef<any[]>([]);

  const [active, setActive] = useState(0);
  const [debug, setDebug] = useState("");

  const pageColors = useMemo(
    () => ["red", "blue", "green", "orange"],
    []
  );

  const scrollTo = (idx: number) => {
    if (idx < 0 || idx >= pageCount) return;
    setActive(idx);
    // 让对应 page 滚动进可视区域（LVGL 内部会按 snap 对齐）
    const target = pageRefs.current[idx];
    const left = target?.style?.left;
    target?.scrollIntoView?.();
    const lefts = pageRefs.current.map((p) => p?.style?.left);
    setDebug(JSON.stringify({ idx, hasRef: !!target, left, lefts }));
  };

  useEffect(() => {
    // 初始定位到第 0 页
    scrollTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style.root}>
      <View
        ref={pagerRef}
        style={style.pager}
      >
        {Array.from({ length: pageCount }).map((_, i) => (
          <View
            onFocusedStyle={style.pageFocused}
            addToFocusGroup
            key={i}
            ref={(ins) => (pageRefs.current[i] = ins)}
            style={[
              style.page,
              { "background-color": pageColors[i % pageColors.length] },
            ]}
          >
            <Text style={style.pageTitle}>Page {i + 1}</Text>
            <Text style={style.pageDesc}>
              flex-row + scroll-snap-x + scrollIntoView()
            </Text>
          </View>
        ))}
      </View>

      <View style={style.controls}>
        <Button
          style={style.navBtn}
          onClick={() => scrollTo(active - 1)}
        >
          <Text>{"<"}</Text>
        </Button>

        <View style={style.dots}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <View
              key={i}
              style={[
                style.dot,
                i === active ? style.dotActive : style.dotInactive,
              ]}
            />
          ))}
        </View>

        <Button
          style={style.navBtn}
          onClick={() => scrollTo(active + 1)}
        >
          <Text>{">"}</Text>
        </Button>
      </View>

      <View style={style.debugBar}>
        <Text style={style.debugText}>{debug}</Text>
      </View>
    </View>
  );
}

const style: Record<string, any> = {
  root: {
    width,
    height,
    padding: 0,
    "border-width": 0,
    "border-radius": 0,
    "background-color": "black",
  },

  // 横向滚动容器
  pager: {
    width,
    height: height - 80,
    "border-width": 0,
    "border-radius": 0,

    display: "flex",
    "flex-direction": "column",

    overflow: 0, // 0 -> add_flag(SCROLLABLE)
    "overflow-scrolling": 1,

    "scroll-snap-x": 3, // LV_SCROLL_SNAP_CENTER（本仓库 lvgl: NONE=0 START=1 END=2 CENTER=3）
  },

  page: {
    width,
    height: height - 80,
    "border-radius": 0,
    "border-width": 0,
    "padding": 16,
    "scroll-enable-snap": 1,
  },

  pageTitle: {
    "text-color": "white",
  },
  pageDesc: {
    "text-color": "white",
  },

  controls: {
    width,
    height: 80,
    display: "flex",
    "flex-flow": 0, // row
    "justify-content": 3, // space-evenly
    "align-items": 2, // center
    "background-color": "grey",
  },

  navBtn: {
    width: 60,
    height: 50,
    "border-radius": 25,
    "background-color": "white",
  },

  dots: {
    display: "flex",
    "flex-flow": 0, // row
    "justify-content": 3,
    "align-items": 2,
    width: width - 140,
    height: 50,
  },

  dot: {
    width: 10,
    height: 10,
    "border-radius": 0x7fff,
  },
  dotActive: {
    "background-color": "white",
    opacity: 255,
  },
  dotInactive: {
    "background-color": "grey",
    opacity: 80,
  },
  pageFocused: {
    "background-color": "white",
    opacity: 255,
  },
  debugBar: {
    width,
    height: 40,
    "background-color": "black",
  },
  debugText: {
    "text-color": "white",
  },
};

Render.render(<App />);

