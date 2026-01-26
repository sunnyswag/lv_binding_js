import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

export function LogDetailPage() {
  const t = useT();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [logId, setLogId] = useState<string>("unknown");

  // 使用 useEffect 监听路由参数变化
  useEffect(() => {
    if (params.id) {
      setLogId(params.id);
    }
  }, [params.id]);

  // 模拟日志详情数据
  const logDetails = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      content: `Log entry ${i + 1} for ${logId}`,
    }));
  }, [logId]);

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("logs.detail")} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {logDetails.map((log, index) => (
            <View
              key={log.id}
              autoFocus={index === 0}
              addToFocusGroup
              onFocusedStyle={style.focused}
              style={style.logItem}
            >
              <Text style={style.logText}>{log.content}</Text>
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
  logItem: {
    width: "100%",
    "min-height": 60,
    "border-radius": 10,
    "background-color": "0x2a2a2a",
    margin: "0 0 8px 0",
    padding: "12px 16px",
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "flex-start",
    "scroll-on-focus": 1,
  },
  logText: {
    "text-color": "white",
    "font-size": 14,
  },
  focused: {
    "background-color": "0x4267FF",
  },
};
