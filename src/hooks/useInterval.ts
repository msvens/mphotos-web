import { useEffect, useRef } from "react";

type CancelTimer = () => void;

export function useInterval(
  callback: () => void,
  delay: number | null
): CancelTimer {
  const savedCallback = useRef<() => void>(callback);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      intervalRef.current = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(intervalRef.current!);
    }
  }, [delay]);

  function cancelInterval() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }
  return cancelInterval;
}
