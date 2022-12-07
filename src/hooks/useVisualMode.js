import { useState } from "react";

/**
 * @param {string} initial
 * @returns {Function} transition
 * @returns {Function} back
 */
export default function useVisualMode(inital) {
  const [mode, setMode] = useState(inital);
  const [history, setHistory] = useState([inital]);

  /**
   * set state of mode and history when mode transits
   * @param {string} mode
   * @param {boolean} replace
   */
  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
      setHistory([history[0]]);
      return;
    }

    setMode(mode);
    setHistory([...history, mode]);
  };

  /**
   * set state of mode and history when mode goes back
   */
  const back = () => {
    if (history.length < 2) {
      setMode(history[0]);
    }

    if (history.length >= 2) {
      setMode(history[history.length - 2]);
    }
    setHistory(history.filter((h, index) => index !== history.length - 1));
  };

  return { mode, transition, back };
}
