// favoritesStorage.js
// Gestiona el almacenamiento local de los Pokémon favoritos.

const FAVORITES_KEY = "pokelandia:favorites";

// Obtiene todos los favoritos almacenados.
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(
      FAVORITES_KEY
    );

    if (!favorites) {
      return [];
    }

    const parsedFavorites =
      JSON.parse(favorites);

    return Array.isArray(parsedFavorites)
      ? parsedFavorites
      : [];
  } catch {
    return [];
  }
}

// Guarda la lista completa de favoritos.
export function saveFavorites(
  favorites = []
) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

// Verifica si un Pokémon ya es favorito.
export function isFavorite(id) {
  const favorites = getFavorites();

  return favorites.includes(Number(id));
}

// Agrega un Pokémon a favoritos.
export function addFavorite(id) {
  const pokemonId = Number(id);

  const favorites = getFavorites();

  if (!favorites.includes(pokemonId)) {
    favorites.push(pokemonId);
    saveFavorites(favorites);
  }

  return favorites;
}

// Elimina un Pokémon de favoritos.
export function removeFavorite(id) {
  const pokemonId = Number(id);

  const favorites = getFavorites().filter(
    (favoriteId) => favoriteId !== pokemonId
  );

  saveFavorites(favorites);

  return favorites;
}

// Agrega o elimina un favorito automáticamente.
export function toggleFavorite(id) {
  if (isFavorite(id)) {
    return removeFavorite(id);
  }

  return addFavorite(id);
}

// Borra todos los favoritos.
export function clearFavorites() {
  localStorage.removeItem(
    FAVORITES_KEY
  );
}