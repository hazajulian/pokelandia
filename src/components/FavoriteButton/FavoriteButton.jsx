// FavoriteButton.jsx
// Permite agregar o quitar un Pokémon de favoritos.

import {
  useEffect,
  useState,
} from "react";

import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import {
  isFavorite,
  toggleFavorite,
} from "../../utils/favoritesStorage";

import "./FavoriteButton.css";

const FAVORITES_EVENT =
  "pokelandia:favorites-changed";

export function FavoriteButton({
  pokemonId,
  pokemonName = "este Pokémon",
  showText = false,
  variant = "default",
  className = "",
  onChange,
}) {
  const [favorite, setFavorite] =
    useState(() =>
      isFavorite(pokemonId)
    );

  useEffect(() => {
    setFavorite(
      isFavorite(pokemonId)
    );
  }, [pokemonId]);

  useEffect(() => {
    function handleFavoritesChange() {
      setFavorite(
        isFavorite(pokemonId)
      );
    }

    window.addEventListener(
      FAVORITES_EVENT,
      handleFavoritesChange
    );

    window.addEventListener(
      "storage",
      handleFavoritesChange
    );

    return () => {
      window.removeEventListener(
        FAVORITES_EVENT,
        handleFavoritesChange
      );

      window.removeEventListener(
        "storage",
        handleFavoritesChange
      );
    };
  }, [pokemonId]);

  function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const updatedFavorites =
      toggleFavorite(pokemonId);

    const newFavoriteState =
      updatedFavorites.includes(
        Number(pokemonId)
      );

    setFavorite(newFavoriteState);

    window.dispatchEvent(
      new CustomEvent(
        FAVORITES_EVENT,
        {
          detail: {
            pokemonId:
              Number(pokemonId),

            isFavorite:
              newFavoriteState,

            favorites:
              updatedFavorites,
          },
        }
      )
    );

    onChange?.({
      pokemonId:
        Number(pokemonId),

      isFavorite:
        newFavoriteState,

      favorites:
        updatedFavorites,
    });
  }

  const buttonClassName = [
    "favoriteButton",
    `favoriteButton--${variant}`,
    favorite
      ? "favoriteButton--active"
      : "",
    showText
      ? "favoriteButton--withText"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const actionText = favorite
    ? "Quitar de favoritos"
    : "Agregar a favoritos";

  return (
    <button
      type="button"
      className={buttonClassName}
      aria-label={`${actionText}: ${pokemonName}`}
      aria-pressed={favorite}
      title={actionText}
      onClick={handleFavoriteClick}
    >
      <span
        className="favoriteButton__icon"
        aria-hidden="true"
      >
        {favorite ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )}
      </span>

      {showText && (
        <span className="favoriteButton__text">
          {favorite
            ? "Guardado"
            : "Agregar a favoritos"}
        </span>
      )}
    </button>
  );
}