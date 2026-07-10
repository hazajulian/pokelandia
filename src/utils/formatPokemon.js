// formatPokemon.js
// Centraliza formatos reutilizables para los datos de Pokémon.

const STAT_NAMES = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
  speed: "Velocidad",
};

const HABITAT_NAMES = {
  cave: "Cueva",
  forest: "Bosque",
  grassland: "Pradera",
  mountain: "Montaña",
  rare: "Raro",
  "rough-terrain": "Terreno accidentado",
  sea: "Mar",
  urban: "Urbano",
  "waters-edge": "Orilla",
};

const COLOR_NAMES = {
  black: "Negro",
  blue: "Azul",
  brown: "Marrón",
  gray: "Gris",
  green: "Verde",
  pink: "Rosa",
  purple: "Morado",
  red: "Rojo",
  white: "Blanco",
  yellow: "Amarillo",
};

const SHAPE_NAMES = {
  arms: "Con brazos",
  ball: "Esférico",
  blob: "Amorfo",
  fish: "Con forma de pez",
  heads: "Con varias cabezas",
  humanoid: "Humanoide",
  legs: "Con piernas",
  quadruped: "Cuadrúpedo",
  squiggle: "Serpenteante",
  tentacles: "Con tentáculos",
  upright: "Erguido",
  wings: "Con alas",
};

// Convierte la primera letra de un texto en mayúscula.
export function capitalizeText(value = "") {
  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return "";
  }

  return (
    normalizedValue.charAt(0).toUpperCase() +
    normalizedValue.slice(1)
  );
}

// Reemplaza guiones por espacios y capitaliza el resultado.
export function formatName(value = "") {
  const normalizedValue = String(value)
    .trim()
    .replace(/-/g, " ");

  return capitalizeText(normalizedValue);
}

// Formatea el número de Pokédex con ceros a la izquierda.
export function formatPokemonId(
  id,
  length = 4
) {
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return "0000";
  }

  return String(numericId).padStart(
    length,
    "0"
  );
}

// Devuelve el número listo para mostrar en la interfaz.
export function formatPokedexNumber(id) {
  return `N.º ${formatPokemonId(id)}`;
}

// Convierte la altura de decímetros a metros.
export function formatPokemonHeight(height) {
  const numericHeight = Number(height);

  if (!Number.isFinite(numericHeight)) {
    return "No disponible";
  }

  const meters = numericHeight / 10;

  return `${meters.toLocaleString("es-AR", {
    minimumFractionDigits: meters % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  })} m`;
}

// Convierte el peso de hectogramos a kilogramos.
export function formatPokemonWeight(weight) {
  const numericWeight = Number(weight);

  if (!Number.isFinite(numericWeight)) {
    return "No disponible";
  }

  const kilograms = numericWeight / 10;

  return `${kilograms.toLocaleString("es-AR", {
    minimumFractionDigits:
      kilograms % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  })} kg`;
}

// Devuelve el nombre localizado de una estadística.
export function formatStatName(statName) {
  return (
    STAT_NAMES[statName] ||
    formatName(statName)
  );
}

// Devuelve el nombre localizado de un hábitat.
export function formatHabitatName(
  habitatName
) {
  if (!habitatName) {
    return "No disponible";
  }

  return (
    HABITAT_NAMES[habitatName] ||
    formatName(habitatName)
  );
}

// Devuelve el nombre localizado de un color.
export function formatColorName(
  colorName
) {
  if (!colorName) {
    return "No disponible";
  }

  return (
    COLOR_NAMES[colorName] ||
    formatName(colorName)
  );
}

// Devuelve el nombre localizado de una forma.
export function formatShapeName(
  shapeName
) {
  if (!shapeName) {
    return "No disponible";
  }

  return (
    SHAPE_NAMES[shapeName] ||
    formatName(shapeName)
  );
}

// Devuelve un texto legible para una habilidad oculta.
export function formatAbilityType(
  isHidden
) {
  return isHidden
    ? "Habilidad oculta"
    : "Habilidad";
}

// Limita un texto y agrega puntos suspensivos.
export function truncateText(
  text = "",
  maxLength = 120
) {
  const normalizedText = String(text).trim();

  if (
    !normalizedText ||
    normalizedText.length <= maxLength
  ) {
    return normalizedText;
  }

  return `${normalizedText
    .slice(0, maxLength)
    .trim()}...`;
}

// Devuelve el porcentaje visual de una estadística.
export function getStatPercentage(
  value,
  maxValue = 255
) {
  const numericValue = Number(value);
  const numericMax = Number(maxValue);

  if (
    !Number.isFinite(numericValue) ||
    !Number.isFinite(numericMax) ||
    numericMax <= 0
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (numericValue / numericMax) * 100
      )
    )
  );
}

// Calcula el total de estadísticas base.
export function getStatsTotal(
  stats = []
) {
  return stats.reduce(
    (total, stat) =>
      total + Number(stat.value || 0),
    0
  );
}

// Devuelve una etiqueta según el tipo especial del Pokémon.
export function getPokemonCategory({
  isLegendary = false,
  isMythical = false,
} = {}) {
  if (isMythical) {
    return "Mítico";
  }

  if (isLegendary) {
    return "Legendario";
  }

  return "Pokémon";
}

// Formatea un valor numérico con respaldo.
export function formatNumber(
  value,
  fallback = "No disponible"
) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  return numericValue.toLocaleString(
    "es-AR"
  );
}