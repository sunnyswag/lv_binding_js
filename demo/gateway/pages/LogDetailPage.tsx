import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CreateStyle, Dimensions, Text, useFocusGroupEdge, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

const TOTAL_PAGES = 5;
const ITEMS_PER_PAGE = 20;
const TOTAL_ITEMS = ITEMS_PER_PAGE * TOTAL_PAGES;

export function LogDetailPage() {
  const t = useT();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [logId, setLogId] = useState<string>("unknown");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState<"prev" | "next">("next");
  const focusItemRef = useRef<any>(null);

  useEffect(() => {
    if (params.id) {
      setLogId(params.id);
    }
  }, [params.id]);

  const allLogDetails = useMemo(() => {
    return Array.from({ length: TOTAL_ITEMS }).map((_, i) => ({
      id: i + 1,
      content: `Log entry ${i + 1} for ${logId}`,
    }));
  }, [logId]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= TOTAL_PAGES;

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allLogDetails.slice(start, start + ITEMS_PER_PAGE);
  }, [allLogDetails, currentPage]);

  useFocusGroupEdge({
    onEdge: (edgeDirection) => {
      if (edgeDirection === "next" && !isLastPage) {
        setDirection("next");
        setCurrentPage((p) => p + 1);
      } else if (edgeDirection === "prev" && !isFirstPage) {
        setDirection("prev");
        setCurrentPage((p) => p - 1);
      }
    }
  });

  useEffect(() => {
    const id = setTimeout(() => {
      focusItemRef.current?.focus?.();
    }, 0);
    return () => clearTimeout(id);
  }, [currentPage, direction]);

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("logs.detail")} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <View
              key={index}
              ref={(el: any) => { 
                if (direction === "next" && index === 0) {
                  focusItemRef.current = el;
                } else if (direction === "prev" && index === ITEMS_PER_PAGE - 1) {
                  focusItemRef.current = el;
                }
               }}
              autoFocus={index === 0 && isFirstPage}
              addToFocusGroup
              onFocusedStyle={style.focused}
              style={style.logItem}
            >
              <Text style={style.logText}>{currentPageData[index]?.content ?? ""}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const style = CreateStyle({
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
    "border-radius": 10,
    margin: "0 0 8px 0",
    padding: "12px 16px",
    "background-color": "#4660FF",
  },
});
