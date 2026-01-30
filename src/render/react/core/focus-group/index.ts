import { useEffect, useRef } from 'react';

const bridge = globalThis[Symbol.for('lvgljs')] as any;
const FocusGroup = bridge?.NativeRender?.FocusGroup;

export type EdgeDirection = 'next' | 'prev';

export interface UseFocusGroupEdgeOptions {
  /**
   * 当焦点到达边缘时的回调
   * @param direction 'next' 表示到达底部/右侧边缘，'prev' 表示到达顶部/左侧边缘
   */
  onEdge: (direction: EdgeDirection) => void;
  
  /**
   * 是否启用循环（到达边缘后是否回到另一端）
   * 默认 false，这样才能触发 edge 回调
   */
  wrap?: boolean;
}

/**
 * 监听焦点组边缘事件
 * 
 * @example
 * ```tsx
 * useFocusGroupEdge({
 *   onEdge: (direction) => {
 *     if (direction === 'next' && !isLastPage) {
 *       setCurrentPage(p => p + 1);
 *     } else if (direction === 'prev' && !isFirstPage) {
 *       setCurrentPage(p => p - 1);
 *     }
 *   }
 * });
 * ```
 */
export function useFocusGroupEdge(options: UseFocusGroupEdgeOptions) {
  const { onEdge, wrap = false } = options;
  const callbackRef = useRef(onEdge);
  
  useEffect(() => {
    callbackRef.current = onEdge;
  }, [onEdge]);

  useEffect(() => {
    if (!FocusGroup) {
      console.warn('FocusGroup API not available');
      return;
    }

    FocusGroup.setWrap(wrap);

    const handler = (isNext: boolean) => {
      const direction: EdgeDirection = isNext ? 'next' : 'prev';
      callbackRef.current(direction);
    };

    FocusGroup.setEdgeCallback(handler);

    return () => {
      FocusGroup.setEdgeCallback(null);
    };
  }, [wrap]);
}

export function setFocusGroupWrap(wrap: boolean) {
  if (!FocusGroup) {
    console.warn('FocusGroup API not available');
    return;
  }
  FocusGroup.setWrap(wrap);
}
