import React from "react";
import { Button, Dimensions, Image, Text, useT, View } from "lvgljs-ui";
import { useNavigate } from "react-router";

const { width, height } = Dimensions.window;

const colWidth = (width - 24 * 2 - 12) / 2;
const rowHeight = (height - 80 - 24 * 2 - 12) / 2;

export function HomePage() {
  const t = useT();
  const navigate = useNavigate();

  const buttons = [
    { path: "/logs", icon: "./demo/gateway/assets/nav_icon/event_log.png", text: t("header.eventLog"), col: 0, row: 0 },
    { path: "/device-info", icon: "./demo/gateway/assets/nav_icon/device_info.png", text: t("header.deviceInfo"), col: 1, row: 0 },
    { path: "/device-status", icon: "./demo/gateway/assets/nav_icon/device_status.png", text: t("header.deviceStatus"), col: 0, row: 1 },
    { path: "/settings", icon: "./demo/gateway/assets/nav_icon/settings.png", text: t("header.settings"), col: 1, row: 1 },
  ];

  return (
    <View style={style.pageRoot}>

      <View style={style.grid}>
        {buttons.map((btn, index) => (
          <View
            key={btn.path}
            autoFocus={index === 0}
            style={[
              style.button, 
              {
                "grid-column-pos": btn.col,
                "grid-row-pos": btn.row,
              },
            ]}
            addToFocusGroup
            onFocusedStyle={style.focused}
            onClick={() => navigate(btn.path)}
          >
            {/* <View style={style.buttonContent}> */}
              <Image src={btn.icon} style={style.image} />
              <Text style={style.buttonText}>{btn.text}</Text>
            {/* </View> */}
          </View>
        ))}
      </View>
    </View>
  );
}

const style: Record<string, any> = {
  pageRoot: {
    width,
    height,
    padding: 0,
    "background-color": "black",
    display: "flex",
    "flex-direction": "column",
    overflow: "hidden",
  },
  header: {
    width,
    height: 80,
    padding: "24px 24px 0 24px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  title: {
    "text-color": "white",
    "font-size": 24,
  },
  grid: {
    width,
    height: height - 80,
    padding: "24px",
    display: "grid",
    "grid-template-columns": `${colWidth} ${colWidth}`,
    "grid-template-rows": `${rowHeight} ${rowHeight}`,
    gap: 12,
  },
  button: {
    "background-color": "#FFFFFF33",
    "border-radius": 16,
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "grid-child": true,
    "align-self": "stretch",
    "justify-self": "stretch"
  },
  buttonContent: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    gap: 8,
  },
  icon: {
    "font-size": 32,
  },
  buttonText: {
    "text-color": "white",
    "font-size": 16,
  },
  focused: {
    "background-color": "#4660FF",
    "border-radius": 16,
  },
  image: {
    width: 'auto',
    height: 'auto',
  },
};
