export function createTimeout(callback: () => void, time: number) {
  const timeout = setTimeout(callback, time);

  return function clear() {
    clearTimeout(timeout);
  };
}
