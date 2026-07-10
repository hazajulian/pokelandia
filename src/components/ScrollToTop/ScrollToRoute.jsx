// ScrollToRoute.jsx
// Vuelve automáticamente al inicio al cambiar de ruta.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}