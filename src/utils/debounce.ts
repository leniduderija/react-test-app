export const debounce = (limit: number, callback: () => void) => {
  let timeoutId: number | null;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, limit, args);
  };
};
