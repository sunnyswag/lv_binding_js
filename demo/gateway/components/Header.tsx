import React from "react";
import { Text, View, useT } from "lvgljs-ui";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <View style={style.header}>
      <Text style={style.headerTitle}>{title}</Text>
    </View>
  );
}

const style: Record<string, any> = {
  header: {
    width: "100%",
    height: 52,
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "background-color": "0x202020",
    padding: "0 16px",
  },
  headerTitle: {
    "text-color": "white",
    "font-size": 16,
  },
};
