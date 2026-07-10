// TypeBadge.jsx
// Muestra un tipo de Pokémon con su nombre y estilo correspondiente.

import {
  getPokemonTypeName,
  getPokemonTypeStyles,
} from "../../utils/pokemonTypes";

import "./TypeBadge.css";

export function TypeBadge({
  type,
  displayName = "",
  variant = "card",
  className = "",
}) {
  if (!type) {
    return null;
  }

  const badgeClassName = [
    "typeBadge",
    `typeBadge--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={badgeClassName}
      style={getPokemonTypeStyles(type)}
    >
      {displayName ||
        getPokemonTypeName(type)}
    </span>
  );
}