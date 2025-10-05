import { useWindowSize } from "@uidotdev/usehooks";

/**
 * Custom hook to determine if the current window size is mobile.
 */
export function useMobile(): boolean {
  const { width } = useWindowSize();
  return (width ?? 1024) < 768;
}
