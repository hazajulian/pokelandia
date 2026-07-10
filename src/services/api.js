// api.js
// Centraliza las peticiones y el procesamiento de datos de PokéAPI.

const API_URL = "https://pokeapi.co/api/v2";

const DEFAULT_LANGUAGE = "es";
const FALLBACK_LANGUAGE = "en";

const requestCache = new Map();

// Realiza una petición y devuelve la respuesta procesada.
async function apiRequest(endpoint) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}${endpoint}`;

  if (requestCache.has(url)) {
    return requestCache.get(url);
  }

  const request = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No se encontró el recurso solicitado.");
        }

        throw new Error(
          "No se pudo obtener la información de PokéAPI."
        );
      }

      return response.json();
    })
    .catch((error) => {
      requestCache.delete(url);
      throw error;
    });

  requestCache.set(url, request);

  return request;
}

// Normaliza nombres o números antes de utilizarlos en una URL.
function normalizePokemonIdentifier(identifier) {
  return String(identifier)
    .trim()
    .toLowerCase();
}

// Obtiene el ID numérico incluido en una URL de PokéAPI.
export function getResourceId(resourceUrl) {
  const parts = resourceUrl
    .split("/")
    .filter(Boolean);

  return Number(parts.at(-1));
}

// Busca un nombre localizado y utiliza inglés como respaldo.
function getLocalizedName(
  names = [],
  fallbackName = ""
) {
  const localizedName = names.find(
    (item) =>
      item.language?.name === DEFAULT_LANGUAGE
  );

  if (localizedName?.name) {
    return localizedName.name;
  }

  const englishName = names.find(
    (item) =>
      item.language?.name === FALLBACK_LANGUAGE
  );

  return englishName?.name || fallbackName;
}

// Busca una descripción localizada y limpia caracteres especiales.
function getLocalizedFlavorText(
  entries = [],
  fallbackText = ""
) {
  const localizedEntry = entries.find(
    (item) =>
      item.language?.name === DEFAULT_LANGUAGE
  );

  const fallbackEntry = entries.find(
    (item) =>
      item.language?.name === FALLBACK_LANGUAGE
  );

  const text =
    localizedEntry?.flavor_text ||
    fallbackEntry?.flavor_text ||
    fallbackText;

  return text
    .replace(/\f/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Busca un efecto localizado y utiliza inglés como respaldo.
function getLocalizedEffect(
  entries = [],
  fallbackText = ""
) {
  const localizedEntry = entries.find(
    (item) =>
      item.language?.name === DEFAULT_LANGUAGE
  );

  const fallbackEntry = entries.find(
    (item) =>
      item.language?.name === FALLBACK_LANGUAGE
  );

  return (
    localizedEntry?.short_effect ||
    localizedEntry?.effect ||
    fallbackEntry?.short_effect ||
    fallbackEntry?.effect ||
    fallbackText
  )
    .replace(/\f/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Devuelve la mejor imagen disponible para un Pokémon.
function getPokemonImage(pokemon) {
  return (
    pokemon.sprites?.other?.[
      "official-artwork"
    ]?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.front_default ||
    ""
  );
}

// Devuelve la mejor imagen shiny disponible.
function getPokemonShinyImage(pokemon) {
  return (
    pokemon.sprites?.other?.[
      "official-artwork"
    ]?.front_shiny ||
    pokemon.sprites?.other?.home?.front_shiny ||
    pokemon.sprites?.front_shiny ||
    ""
  );
}

// Obtiene una lista paginada de Pokémon.
export async function getPokemonList({
  offset = 0,
  limit = 20,
} = {}) {
  const data = await apiRequest(
    `/pokemon?offset=${offset}&limit=${limit}`
  );

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((pokemon) => ({
      id: getResourceId(pokemon.url),
      name: pokemon.name,
      url: pokemon.url,
    })),
  };
}

// Obtiene los datos generales de un Pokémon.
export async function getPokemon(
  identifier
) {
  const normalizedIdentifier =
    normalizePokemonIdentifier(identifier);

  return apiRequest(
    `/pokemon/${normalizedIdentifier}`
  );
}

// Obtiene los datos de especie de un Pokémon.
export async function getPokemonSpecies(
  identifier
) {
  const normalizedIdentifier =
    normalizePokemonIdentifier(identifier);

  return apiRequest(
    `/pokemon-species/${normalizedIdentifier}`
  );
}

// Obtiene la información completa de un tipo.
export async function getType(typeIdentifier) {
  const normalizedIdentifier =
    normalizePokemonIdentifier(typeIdentifier);

  const type = await apiRequest(
    `/type/${normalizedIdentifier}`
  );

  return {
    id: type.id,
    name: type.name,
    displayName: getLocalizedName(
      type.names,
      type.name
    ),
    pokemon: type.pokemon.map((item) => ({
      id: getResourceId(item.pokemon.url),
      name: item.pokemon.name,
      url: item.pokemon.url,
      slot: item.slot,
    })),
  };
}

// Obtiene los tipos utilizados en combates Pokémon.
export async function getPokemonTypes() {
  const data = await apiRequest("/type?limit=100");

  const excludedTypes = new Set([
    "unknown",
    "shadow",
  ]);

  const validTypes = data.results.filter(
    (type) => !excludedTypes.has(type.name)
  );

  const translatedTypes = await Promise.all(
    validTypes.map(async (type) => {
      const typeData = await apiRequest(type.url);

      return {
        id: typeData.id,
        name: typeData.name,
        displayName: getLocalizedName(
          typeData.names,
          typeData.name
        ),
      };
    })
  );

  return translatedTypes.sort(
    (firstType, secondType) =>
      firstType.id - secondType.id
  );
}

// Obtiene información localizada de una habilidad.
export async function getAbility(
  abilityIdentifier
) {
  const normalizedIdentifier =
    normalizePokemonIdentifier(
      abilityIdentifier
    );

  const ability = await apiRequest(
    `/ability/${normalizedIdentifier}`
  );

  return {
    id: ability.id,
    name: ability.name,
    displayName: getLocalizedName(
      ability.names,
      ability.name
    ),
    description: getLocalizedEffect(
      ability.effect_entries,
      "No hay una descripción disponible."
    ),
  };
}

// Procesa un tipo perteneciente a un Pokémon.
async function formatPokemonType(typeEntry) {
  const typeData = await apiRequest(
    typeEntry.type.url
  );

  return {
    id: typeData.id,
    slot: typeEntry.slot,
    name: typeData.name,
    displayName: getLocalizedName(
      typeData.names,
      typeData.name
    ),
  };
}

// Procesa una habilidad perteneciente a un Pokémon.
async function formatPokemonAbility(
  abilityEntry
) {
  const abilityData = await getAbility(
    abilityEntry.ability.name
  );

  return {
    ...abilityData,
    slot: abilityEntry.slot,
    isHidden: abilityEntry.is_hidden,
  };
}

// Formatea las estadísticas base de un Pokémon.
function formatPokemonStats(stats = []) {
  return stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
    effort: stat.effort,
  }));
}

// Formatea una lista reducida de movimientos.
function formatPokemonMoves(
  moves = [],
  limit = 8
) {
  return moves
    .slice(0, limit)
    .map((move) => ({
      name: move.move.name,
      url: move.move.url,
    }));
}

// Obtiene y combina todos los datos necesarios para el detalle.
export async function getPokemonDetail(
  identifier
) {
  const normalizedIdentifier =
    normalizePokemonIdentifier(identifier);

  const [pokemon, species] =
    await Promise.all([
      getPokemon(normalizedIdentifier),
      getPokemonSpecies(normalizedIdentifier),
    ]);

  const [types, abilities] =
    await Promise.all([
      Promise.all(
        pokemon.types.map(formatPokemonType)
      ),
      Promise.all(
        pokemon.abilities.map(
          formatPokemonAbility
        )
      ),
    ]);

  return {
    id: pokemon.id,
    name: pokemon.name,
    displayName: getLocalizedName(
      species.names,
      pokemon.name
    ),
    order: pokemon.order,

    image: getPokemonImage(pokemon),
    shinyImage: getPokemonShinyImage(pokemon),
    sprite: pokemon.sprites?.front_default || "",
    backSprite: pokemon.sprites?.back_default || "",

    height: pokemon.height,
    weight: pokemon.weight,
    baseExperience:
      pokemon.base_experience ?? null,

    description: getLocalizedFlavorText(
      species.flavor_text_entries,
      "No hay una descripción disponible."
    ),

    genus: getLocalizedName(
      species.genera?.map((item) => ({
        name: item.genus,
        language: item.language,
      })),
      ""
    ),

    habitat:
      species.habitat?.name || null,

    color:
      species.color?.name || null,

    shape:
      species.shape?.name || null,

    captureRate:
      species.capture_rate ?? null,

    baseHappiness:
      species.base_happiness ?? null,

    isLegendary:
      Boolean(species.is_legendary),

    isMythical:
      Boolean(species.is_mythical),

    types,
    abilities,
    stats: formatPokemonStats(
      pokemon.stats
    ),
    moves: formatPokemonMoves(
      pokemon.moves
    ),
  };
}

// Obtiene datos básicos para mostrar una tarjeta.
export async function getPokemonCardData(
  identifier
) {
  const pokemon = await getPokemon(
    identifier
  );

  const types = await Promise.all(
    pokemon.types.map(formatPokemonType)
  );

  return {
    id: pokemon.id,
    name: pokemon.name,
    displayName: pokemon.name,
    image: getPokemonImage(pokemon),
    types,
  };
}

// Obtiene las tarjetas de varios Pokémon en paralelo.
export async function getPokemonCards(
  pokemonList = []
) {
  return Promise.all(
    pokemonList.map((pokemon) =>
      getPokemonCardData(
        pokemon.id || pokemon.name
      )
    )
  );
}

// Limpia la caché en memoria cuando sea necesario.
export function clearApiCache() {
  requestCache.clear();
}