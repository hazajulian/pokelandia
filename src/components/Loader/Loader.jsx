// Loader.jsx
// Muestra un indicador de carga reutilizable para toda la aplicación.

import pokeball from "../../assets/poke-ico.png";

import "./Loader.css";

export function Loader({
  title = "Cargando...",
  description = "Obteniendo información de la Pokédex.",
  size = "default",
  fullScreen = false,
  className = "",
}) {
  const loaderClassName = [
    "loader",
    `loader--${size}`,
    fullScreen
      ? "loader--fullscreen"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={loaderClassName}
      role="status"
      aria-live="polite"
    >
      <div className="loader__imageWrapper">
        <img
          src={pokeball}
          alt="Poké Ball"
          className="loader__image"
        />
      </div>

      <h2 className="loader__title">
        {title}
      </h2>

      <p className="loader__description">
        {description}
      </p>
    </div>
  );
}