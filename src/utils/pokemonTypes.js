// pokemonTypes.js
// Centraliza la configuración visual de los tipos de Pokémon.

const POKEMON_TYPES = {
  normal: {
    name: "Normal",
    color: "#929da3",
    softColor: "#e7ebed",
    textColor: "#17212b",
  },

  fire: {
    name: "Fuego",
    color: "#ff7a45",
    softColor: "#ffe3d6",
    textColor: "#4a1d0f",
  },

  water: {
    name: "Agua",
    color: "#4f9fe8",
    softColor: "#dcebfa",
    textColor: "#102f4d",
  },

  electric: {
    name: "Eléctrico",
    color: "#f4c430",
    softColor: "#fff2b8",
    textColor: "#3d3200",
  },

  grass: {
    name: "Planta",
    color: "#63bc5a",
    softColor: "#dff2dc",
    textColor: "#173b15",
  },

  ice: {
    name: "Hielo",
    color: "#73cec0",
    softColor: "#ddf7f3",
    textColor: "#123d38",
  },

  fighting: {
    name: "Lucha",
    color: "#ce416b",
    softColor: "#f8dce5",
    textColor: "#4d1324",
  },

  poison: {
    name: "Veneno",
    color: "#aa6bc8",
    softColor: "#eedff5",
    textColor: "#3d194c",
  },

  ground: {
    name: "Tierra",
    color: "#d97845",
    softColor: "#f7dfd3",
    textColor: "#4a2411",
  },

  flying: {
    name: "Volador",
    color: "#89aae3",
    softColor: "#e3ecfa",
    textColor: "#1e355b",
  },

  psychic: {
    name: "Psíquico",
    color: "#f77979",
    softColor: "#fde0e0",
    textColor: "#4d1717",
  },

  bug: {
    name: "Bicho",
    color: "#91c12f",
    softColor: "#e8f3cf",
    textColor: "#2e3d0e",
  },

  rock: {
    name: "Roca",
    color: "#c5b78c",
    softColor: "#eee9d8",
    textColor: "#403a26",
  },

  ghost: {
    name: "Fantasma",
    color: "#5269ad",
    softColor: "#dde3f5",
    textColor: "#17244d",
  },

  dragon: {
    name: "Dragón",
    color: "#0b6dc3",
    softColor: "#d7eaf9",
    textColor: "#0b2f50",
  },

  dark: {
    name: "Siniestro",
    color: "#5a5465",
    softColor: "#e1dfe6",
    textColor: "#211e26",
  },

  steel: {
    name: "Acero",
    color: "#5a8ea2",
    softColor: "#dce9ee",
    textColor: "#16303a",
  },

  fairy: {
    name: "Hada",
    color: "#ec8fe6",
    softColor: "#fae0f8",
    textColor: "#4f204c",
  },
};

const DEFAULT_TYPE = {
  name: "Desconocido",
  color: "#8c98a5",
  softColor: "#e4e8ec",
  textColor: "#1f2933",
};

// Devuelve la configuración completa de un tipo.
export function getPokemonType(typeName) {
  const normalizedType = String(typeName || "")
    .trim()
    .toLowerCase();

  return (
    POKEMON_TYPES[normalizedType] ||
    DEFAULT_TYPE
  );
}

// Devuelve el nombre en español de un tipo.
export function getPokemonTypeName(
  typeName
) {
  return getPokemonType(typeName).name;
}

// Devuelve el color principal de un tipo.
export function getPokemonTypeColor(
  typeName
) {
  return getPokemonType(typeName).color;
}

// Devuelve el color suave de un tipo.
export function getPokemonTypeSoftColor(
  typeName
) {
  return getPokemonType(typeName).softColor;
}

// Devuelve el color de texto recomendado.
export function getPokemonTypeTextColor(
  typeName
) {
  return getPokemonType(typeName).textColor;
}

// Devuelve variables CSS listas para usar en un componente.
export function getPokemonTypeStyles(
  typeName
) {
  const type = getPokemonType(typeName);

  return {
    "--type-color": type.color,
    "--type-soft-color": type.softColor,
    "--type-text-color": type.textColor,
  };
}

// Devuelve todos los tipos disponibles.
export function getAllPokemonTypes() {
  return Object.entries(POKEMON_TYPES).map(
    ([key, value]) => ({
      key,
      ...value,
    })
  );
}

// Devuelve el primer tipo disponible como tipo principal.
export function getPrimaryPokemonType(
  types = []
) {
  return (
    types[0]?.name ||
    types[0]?.type?.name ||
    "normal"
  );
}

// Verifica si un tipo está soportado.
export function isValidPokemonType(
  typeName
) {
  const normalizedType = String(typeName || "")
    .trim()
    .toLowerCase();

  return Boolean(
    POKEMON_TYPES[normalizedType]
  );
}