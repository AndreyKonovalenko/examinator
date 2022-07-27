import React from "react";
import { useRef, useEffect } from "react";

const useOutsideEvent = (ref, func) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    const handleHideDropdown = (event) => {
      if (event.key === "Escape") {
        func();
      }
    };

    // Bind the event listener
    document.addEventListener("keydown", handleHideDropdown);
    document.addEventListener("mousedown", handleClickOutside);
    console.log("even hadler added");
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleHideDropdown);
      document.removeEventListener("mousedown", handleClickOutside);
      console.log("event handler removed");
    };
  }, [ref]);
};

const OutsideClickEscHandler = (props) => {
  const wrapperRef = useRef(null);
  const { clickHandler, children } = props;
  useOutsideEvent(wrapperRef, clickHandler);
  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClicEsckHandler;
