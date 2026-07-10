// ScrollToTop.jsx
// Muestra un botón para volver al inicio de la página.

import {
  useEffect,
  useState,
} from "react";

import { FaArrowUp } from "react-icons/fa";

import "./ScrollToTop.css";

export function ScrollToTop({
  showAfter = 300,
}) {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(
        window.scrollY > showAfter
      );
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [showAfter]);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className="scrollToTop"
      aria-label="Volver al inicio"
      title="Volver arriba"
      onClick={handleScrollToTop}
    >
      <FaArrowUp
        aria-hidden="true"
        className="scrollToTop__icon"
      />
    </button>
  );
}