import { useEffect, useMemo, useRef } from "react";
import { debounce } from "utils/debounce";

export const useDebounce = (callback: (value: string) => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(1000, func);
  }, []);
};
