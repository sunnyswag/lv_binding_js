import React from "react";
import { Button, Dimensions, Text, useT, View } from "lvgljs-ui";
import { useNavigate } from "react-router";

const { width, height } = Dimensions.window;

export function HomePage() {
  const t = useT();
  const navigate = useNavigate();
  const btnW = Math.floor((width - 24 * 2 - 12) / 2);
  const btnH = 120;

  return (
    <View style={style.pageRoot}>
      <View style={style.header}>
        <Text style={style.title}>{t("home.title")}</Text>
      </View>

      <View style={style.grid}>
        <Button
          autoFocus
          style={[style.button, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/logs")}
          addToFocusGroup
        >
          <View style={style.buttonContent}>
            <Text style={style.icon}>📋</Text>
            <Text style={style.buttonText}>{t("header.eventLog")}</Text>
          </View>
        </Button>
        <Button
          style={[style.button, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/device-info")}
          addToFocusGroup
        >
          <View style={style.buttonContent}>
            <Text style={style.icon}>ℹ️</Text>
            <Text style={style.buttonText}>{t("header.deviceInfo")}</Text>
          </View>
        </Button>
        <Button
          style={[style.button, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/device-status")}
          addToFocusGroup
        >
          <View style={style.buttonContent}>
            <Text style={style.icon}>📊</Text>
            <Text style={style.buttonText}>{t("header.deviceStatus")}</Text>
          </View>
        </Button>
        <Button
          style={[style.button, { width: btnW, height: btnH }]}
          onFocusedStyle={style.focused}
          onClick={() => navigate("/settings")}
          addToFocusGroup
        >
          <View style={style.buttonContent}>
            <Text style={style.icon}>⚙️</Text>
            <Text style={style.buttonText}>{t("header.settings")}</Text>
          </View>
        </Button>
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
    display: "flex",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "space-between",
    "align-content": "flex-start",
  },
  button: {
    "background-color": "0x1d1d1d",
    "border-radius": 16,
    margin: "0 0 12px 0",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
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
    "background-color": "0x4267FF",
  },
};
