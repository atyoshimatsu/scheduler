import { useState } from "react";

export default function useVisualMode (inital) {
  const [mode, setMode] = useState(inital);
  const [history, setHistory] = useState([inital]);

  function transition (mode, replace = false) {
    if (replace) {
      setMode(mode);
      setHistory([history[0]]);
      return;
    }

    setMode(mode);
    setHistory([...history, mode]);
  }

  function back () {
    if (history.length < 2) {
      setMode(history[0]);
    }

    if (history.length >= 2) {
      setMode(history[history.length - 2]);
    }
    setHistory(history.filter((h, index) => index !== history.length - 1));
  }

  return { mode, transition, back } ;
};
