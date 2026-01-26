import React from "react";
import { Text, View } from "lvgljs-ui";

interface ListItemProps {
  title: string;
  badge?: string;
  badgeColor?: string;
  showArrow?: boolean;
  onClick?: () => void;
  autoFocus?: boolean;
}

export function ListItem({
  title,
  badge,
  badgeColor = "0xFF0000",
  showArrow = true,
  onClick,
  autoFocus = false,
}: ListItemProps) {
  return (
    <View
      autoFocus={autoFocus}
      addToFocusGroup
      onFocusedStyle={style.focused}
      style={style.listItem}
      onClick={onClick}
    >
      <View style={style.content}>
        <Text style={style.title}>{title}</Text>
        {badge && (
          <View style={[style.badge, { "background-color": badgeColor }]}>
            <Text style={style.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {showArrow && (
        <Text style={style.arrow}>→</Text>
      )}
    </View>
  );
}

const style: Record<string, any> = {
  listItem: {
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
  content: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "flex": 1,
  },
  title: {
    "text-color": "white",
    "font-size": 16,
  },
  badge: {
    "border-radius": 12,
    padding: "2px 8px",
    margin: "0 0 0 12px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "min-width": 24,
    height: 20,
  },
  badgeText: {
    "text-color": "white",
    "font-size": 12,
  },
  arrow: {
    "text-color": "white",
    "font-size": 18,
    margin: "0 0 0 12px",
  },
  focused: {
    "background-color": "#4660FF",
  },
};
