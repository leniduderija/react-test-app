import { useRef, useState } from "react";

export type UseBooleanReturn = [
  boolean,
  {
    toggle: () => void;
    on: () => void;
    off: () => void;
  },
];

export const useBoolean = (initialState = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialState);

  const updateValue = useRef({
    toggle: () => setValue((oldValue) => !oldValue),
    on: () => setValue(true),
    off: () => setValue(false),
  });

  return [value, updateValue.current];
};
