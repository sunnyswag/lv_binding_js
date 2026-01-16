import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AddChildToDefGroup,
  Arc,
  Button,
  Checkbox,
  Dimensions,
  Render,
  Slider,
  Text,
  View,
} from "lvgljs-ui";
import { useAutoFocus } from "./useAutoFocus";

const { width, height } = Dimensions.window;

type Page = "home" | "p1" | "p2" | "p3" | "p4";

function Header({
  title,
  onBack,
  autoFocusBack,
}: {
  title: string;
  onBack: () => void;
  autoFocusBack?: boolean;
}) {
  const backRef = useRef<any>(null);
  useAutoFocus(backRef, [autoFocusBack]);

  return (
    <View style={style.header}>
      <Button
        ref={backRef}
        style={style.backBtn}
        onFocusedStyle={style.focused}
        onClick={onBack}
      >
        <Text style={style.backText}>{"<"}</Text>
      </Button>
      <Text style={style.headerTitle}>{title}</Text>
    </View>
  );
}

function Page1List({ onBack }: { onBack: () => void }) {
  const items = useMemo(() => Array.from({ length: 40 }).map((_, i) => i + 1), []);
  const firstItemRef = useRef<any>(null);
  useAutoFocus(firstItemRef, []);

  return (
    <View style={style.pageRoot}>
      <Header title="Page 1 - Vertical Scrollable List" onBack={onBack} autoFocusBack={false} />

      <View style={style.content}>
        <View style={style.scrollBox} groupType={AddChildToDefGroup}>
          {items.map((n) => (
            <View
              key={n}
              {...({ ref: n === 1 ? (ins: any) => (firstItemRef.current = ins) : undefined } as any)}
              onFocusedStyle={style.focused}
              style={style.listRow}
              onClick={() => {
                // no-op (demo)
              }}
            >
              <Text style={style.rowText}>{`Item ${n}`}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function Page2Info({ onBack }: { onBack: () => void }) {
  const infos = useMemo(
    () => [
      { title: "Info A", body: "This is the first section of info (for demo switching)." },
      { title: "Info B", body: "This is the second section. Use Left/Right to switch." },
      { title: "Info C", body: "This is the third section. Dots indicate the current page." },
      { title: "Info D", body: "This is the fourth section. A simple info page example." },
      { title: "Info E", body: "This is the fifth section. Switching loops around." },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const cur = infos[idx];

  const prev = () => setIdx((i) => (i - 1 + infos.length) % infos.length);
  const next = () => setIdx((i) => (i + 1) % infos.length);
  return (
    <View style={style.pageRoot}>
      <Header title="Page 2 - Info Display/Switch" onBack={onBack} autoFocusBack />

      <View style={style.content}>
        <View style={style.infoCard}>
          <Text style={style.infoTitle}>{cur.title}</Text>
          <Text style={style.infoBody}>{cur.body}</Text>
        </View>

        <View style={style.infoControls}>
          <Button
            style={style.navBtn}
            onFocusedStyle={style.focused}
            onClick={prev}
          >
            <Text style={style.navBtnText}>{"<"}</Text>
          </Button>

          <Button
            style={style.navBtn}
            onFocusedStyle={style.focused}
            onClick={next}
          >
            <Text style={style.navBtnText}>{">"}</Text>
          </Button>
        </View>

        <View style={style.dots}>
          {infos.map((_, i) => (
            <View
              key={i}
              style={[style.dot, i === idx ? style.dotActive : style.dotInactive]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function Page3Controls({ onBack }: { onBack: () => void }) {
  const [slider, setSlider] = useState(30);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  return (
    <View style={style.pageRoot}>
      <Header title="Page 3 - Control List" onBack={onBack} autoFocusBack />

      <View style={style.content}>
        <View style={style.scrollBox} groupType={AddChildToDefGroup}>
          <Text style={style.sectionTitle}>Slider</Text>
          <Slider
            style={style.slider}
            indicatorStyle={style.sliderIndicator}
            knobStyle={style.sliderKnob}
            onKnobPressedStyle={style.sliderKnobPressed}
            onIndicatorPressedStyle={style.sliderIndicatorPressed}
            range={[0, 100]}
            value={slider}
            onChange={(e) => setSlider(e.value)}
          />
          <Text style={style.rowText}>{`Current Value: ${Math.round(slider)}%`}</Text>

          <View style={style.divider} />

          <Text style={style.sectionTitle}>Checkbox</Text>
          <Checkbox
            checked={checked1}
            text="Option 1"
            onChange={(e) => setChecked1(!!e.checked)}
          />
          <Checkbox
            checked={checked2}
            text="Option 2"
            onChange={(e) => setChecked2(!!e.checked)}
          />

          <View style={style.divider} />

          <Text style={style.sectionTitle}>Button + Text</Text>
          <Button
            style={style.actionBtn}
            onFocusedStyle={style.focused}
            onClick={() => {
              setSlider(50);
              setChecked1(false);
              setChecked2(true);
            }}
          >
            <Text style={style.actionBtnText}>Reset to Default</Text>
          </Button>

          <Text style={style.hintText}>
            {`Hint: This page's controls are vertically arranged, and the container is scrollable.\nAll operable controls are marked with groupType.`}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Page4Countdown({ onBack }: { onBack: () => void }) {
  const total = 60;
  const [remain, setRemain] = useState(total);

  useEffect(() => {
    setRemain(total);
    const t: ReturnType<typeof setInterval> = setInterval(() => {
      setRemain((r) => (r <= 0 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(t as any);
  }, []);

  const elapsed = total - remain;
  const angle = Math.floor((elapsed / total) * 360);
  return (
    <View style={style.pageRoot}>
      <Header title="Page 4 - 60s Countdown Progress Circle (Circular Progress Bar)" onBack={onBack} autoFocusBack />

      <View style={style.centerContent}>
        <Arc
          style={style.arc}
          indicatorStyle={style.arcIndicator}
          knobStyle={style.arcKnobHidden}
          range={[0, total]}
          value={elapsed}
          rotation={270}
          backgroundStartAngle={0}
          backgroundEndAngle={360}
          startAngle={0}
          endAngle={angle}
          mode="normal"
          changeRate={360}
          onChange={() => {
            // keep non-interactive for this demo
          }}
        />
        <Text style={style.bigText}>{`time${remain}s`}</Text>
        <Button
          style={style.actionBtn}
          onFocusedStyle={style.focused}
          onClick={() => setRemain(total)}
        >
          <Text style={style.actionBtnText}>Restart</Text>
        </Button>
      </View>
    </View>
  );
}

function Home({ go }: { go: (p: Page) => void }) {
  const btnW = Math.floor((width - 24 * 2 - 12) / 2);
  const btnH = 72;

  return (
    <View style={style.pageRoot}>
      <View style={style.homeHeader}>
        <Text style={style.homeTitle}>Navigation Demo (5 Pages)</Text>
        <Text style={style.homeSubTitle}>Four-grid to enter sub-pages, top-left return</Text>
      </View>

      <View style={style.homeGrid}>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => go("p1")}
        >
          <Text style={style.homeBtnText}>Page 1</Text>
        </Button>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => go("p2")}
        >
          <Text style={style.homeBtnText}>Page 2</Text>
        </Button>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => go("p3")}
        >
          <Text style={style.homeBtnText}>Page 3</Text>
        </Button>
        <Button
          style={[style.homeBtn, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => go("p4")}
        >
          <Text style={style.homeBtnText}>Page 4</Text>
        </Button>
      </View>
    </View>
  );
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const backToHome = () => setPage("home");

  if (page === "p1") return <Page1List onBack={backToHome} />;
  if (page === "p2") return <Page2Info onBack={backToHome} />;
  if (page === "p3") return <Page3Controls onBack={backToHome} />;
  if (page === "p4") return <Page4Countdown onBack={backToHome} />;
  return <Home go={setPage} />;
}

const style: Record<string, any> = {
  pageRoot: {
    width,
    height,
    padding: 0,
    "background-color": "black",
    display: "flex",
    "flex-direction": "column",
  },

  header: {
    width,
    height: 52,
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "background-color": "0x202020",
  },
  backBtn: {
    width: 44,
    height: 36,
    "border-radius": 10,
    "background-color": "0x404040",
    margin: "0 8px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  backText: { "text-color": "white", "font-size": 18 },
  headerTitle: { "text-color": "white", "font-size": 16 },

  content: {
    width,
    height: height - 52,
    padding: 12,
    display: "flex",
    "flex-direction": "column",
  },
  centerContent: {
    width,
    height: height - 52,
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  },

  focused: {
    "border-width": 3,
    "border-color": "0x00bcd4",
  },

  scrollBox: {
    width: width - 24,
    height: height - 52 - 24,
    padding: 8,
    "background-color": "0x101010",
    "border-radius": 10,
    overflow: 0, // make scrollable
    "overflow-scrolling": 1,
    display: "flex",
    "flex-direction": "column",
  },

  listRow: {
    width: "100%",
    height: 44,
    "border-radius": 10,
    "background-color": "0x2a2a2a",
    margin: "0 0 8px 0",
    padding: "0 10px",
    display: "flex",
    "align-items": "center",
    "justify-content": "flex-start",
    "scroll-on-focus": 1,
  },
  rowText: { "text-color": "white", "font-size": 14 },

  infoCard: {
    width: width - 24,
    height: height - 52 - 140,
    padding: 12,
    "background-color": "0x101010",
    "border-radius": 12,
  },
  infoTitle: { "text-color": "white", "font-size": 18, "padding-bottom": 8 },
  infoBody: { "text-color": "0xd0d0d0", "font-size": 14 },
  infoControls: {
    width: width - 24,
    height: 60,
    margin: "10px 0 0 0",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
    "align-items": "center",
  },
  navBtn: {
    width: 64,
    height: 44,
    "border-radius": 12,
    "background-color": "white",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  navBtnText: { "text-color": "black", "font-size": 18 },
  dots: {
    width: width - 24,
    height: 30,
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
  },
  dot: {
    width: 10,
    height: 10,
    "border-radius": 0x7fff,
    margin: "0 4px",
  },
  dotActive: { "background-color": "white", opacity: 255 },
  dotInactive: { "background-color": "grey", opacity: 80 },

  sectionTitle: {
    "text-color": "white",
    "font-size": 16,
    "padding-bottom": 6,
  },
  divider: {
    width: "100%",
    height: 1,
    "background-color": "0x303030",
    margin: "10px 0",
  },
  slider: {
    "background-color": "0x404040",
    "border-radius": 0x7fff,
    padding: "-2px 0",
  },
  sliderIndicator: { "background-color": "0x00bcd4", "border-radius": 0x7fff },
  sliderIndicatorPressed: { "background-color": "0x00838F" },
  sliderKnob: {
    "background-color": "white",
    "border-width": 2,
    "border-color": "0x00bcd4",
    "border-radius": 0x7fff,
    padding: 6,
  },
  sliderKnobPressed: { "border-color": "0x00838F", "background-color": "0x00838F" },

  actionBtn: {
    width: width - 24,
    height: 44,
    "border-radius": 12,
    "background-color": "white",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    margin: "6px 0 0 0",
  },
  actionBtnText: { "text-color": "black", "font-size": 14 },
  hintText: {
    width: "100%",
    "text-color": "0xb0b0b0",
    "font-size": 12,
    "padding-top": 10,
  },

  arc: {
    width: 220,
    height: 220,
    "arc-width": 18,
    "arc-color": "red",
    "arc-rounded": true,
    "background-color": "black",
  },
  arcIndicator: { "arc-width": 18, "arc-color": "0x00bcd4", "arc-rounded": true },
  arcKnobHidden: { width: 1, height: 1, opacity: 0 },
  bigText: { "text-color": "black", "font-size": 26, "padding-top": 10 },

  homeHeader: {
    width,
    height: 100,
    padding: "18px 24px 0 24px",
  },
  homeTitle: { "text-color": "white", "font-size": 20 },
  homeSubTitle: { "text-color": "0xb0b0b0", "font-size": 12, "padding-top": 6 },
  homeGrid: {
    width,
    height: height - 100,
    padding: "0 24px",
    display: "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "space-between",
    "align-content": "flex-start",
  },
  homeBtn: {
    "background-color": "0x1d1d1d",
    "border-radius": 14,
    margin: "0 0 12px 0",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  homeBtnText: { "text-color": "white", "font-size": 16 },
};

Render.render(<App />);


