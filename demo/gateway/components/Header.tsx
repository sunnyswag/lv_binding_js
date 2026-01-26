import React from "react";
import { Image, Text, View, useT } from "lvgljs-ui";

interface HeaderProps {
  title: string;
  backIcon?: string;
}

export function Header({ title, backIcon }: HeaderProps) {
  return (
    <View style={style.header}>
      {backIcon && <Image src={backIcon} style={style.headerIcon} />}
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
  headerIcon: {
    width: 'auto',
    height: 'auto',
  },
  headerTitle: {
    "text-color": "white",
    "font-size": 16,
  },
};
