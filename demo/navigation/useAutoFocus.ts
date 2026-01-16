import { useEffect } from "react";

/**
 * Minimal helper to avoid repeating `useEffect(() => ref.current?.focus?.(), [])`.
 * Requires the underlying native component to expose a `focus()` method.
 */
export function useAutoFocus(ref: { current?: any }, deps: any[] = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    ref.current?.focus?.();
  }, deps);
}


