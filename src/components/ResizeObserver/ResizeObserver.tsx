import { useEffect, useState } from "react";
import "./ResizeObserver.scss";

export const ResizeObserverFix = () => {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
    window.addEventListener("error", (e) => {
      if (e) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr)
          resizeObserverErr.className = "hide-resize-observer";
        if (resizeObserverErrDiv)
          resizeObserverErrDiv.className = "hide-resize-observer";
      }
    });
    setIsRun(true);
  }

  useEffect(() => () => setIsRun(false), []);

  return <></>;
};
