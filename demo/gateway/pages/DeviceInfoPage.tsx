import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

export function DeviceInfoPage() {
  const t = useT();
  const navigate = useNavigate();

  const infoItems = useMemo(
    () => [
      { label: "Device Name", value: "AX100M" },
      { label: "Firmware Version", value: "v1.2.3" },
      { label: "MAC Address", value: "00:11:22:33:44:55" },
      { label: "IP Address", value: "192.168.1.100" },
      { label: "Serial Number", value: "SN123456789" },
    ],
    []
  );

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("deviceInfo.title")} backIcon={"./demo/gateway/assets/nav_icon/device_info.png"} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {infoItems.map((item, index) => (
            <View
              key={item.label}
              autoFocus={index === 0}
              addToFocusGroup
              onFocusedStyle={style.focused}
              style={style.infoItem}
            >
              <Text style={style.label}>{item.label}</Text>
              <Text style={style.value}>{item.value}</Text>
            </View>
          ))}
        </View>
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
  content: {
    width,
    height: height - 52,
    padding: 12,
    display: "flex",
    "flex-direction": "column",
  },
  scrollBox: {
    width: width - 24,
    height: height - 52 - 24,
    padding: 8,
    "background-color": "0x101010",
    "border-radius": 10,
    overflow: 0,
    "overflow-scrolling": 1,
    display: "flex",
    "flex-direction": "column",
  },
  infoItem: {
    width: "100%",
    height: 60,
    "border-radius": 10,
    "background-color": "0x2a2a2a",
    margin: "0 0 8px 0",
    padding: "0 16px",
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "justify-content": "space-between",
    "scroll-on-focus": 1,
  },
  label: {
    "text-color": "0xb0b0b0",
    "font-size": 14,
  },
  value: {
    "text-color": "white",
    "font-size": 14,
  },
  focused: {
    "background-color": "#4660FF",
  },
};
