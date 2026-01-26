import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

export function LanguageSettingsPage() {
  const t = useT();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { id: "zh", label: t("language.zh") },
    { id: "en", label: t("language.en") },
    { id: "ja", label: t("language.ja") },
  ];

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("language.title")} backIcon={"./demo/gateway/assets/nav_icon/language.png"} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {languages.map((lang, index) => (
            <View
              key={lang.id}
              autoFocus={index === 0}
              addToFocusGroup
              onFocusedStyle={style.focused}
              style={[
                style.langItem,
                selectedLang === lang.id && style.langItemSelected,
              ]}
              onClick={() => setSelectedLang(lang.id)}
            >
              <Text style={style.langText}>{lang.label}</Text>
              {selectedLang === lang.id && (
                <Text style={style.checkmark}>✓</Text>
              )}
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
  langItem: {
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
  langItemSelected: {
    "background-color": "#4660FF",
  },
  langText: {
    "text-color": "white",
    "font-size": 16,
  },
  checkmark: {
    "text-color": "white",
    "font-size": 18,
  },
  focused: {
    "background-color": "#4660FF",
  },
};
