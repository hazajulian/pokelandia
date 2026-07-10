// Favorites.jsx
// Muestra los Pokémon guardados como favoritos por el usuario.

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FaHeart,
  FaTrashAlt,
} from "react-icons/fa";

import { getPokemonCards } from "../../services/api";

import {
  clearFavorites,
  getFavorites,
} from "../../utils/favoritesStorage";

import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import { Loader } from "../../components/Loader/Loader";
import { SortControls } from "../../components/SortControls/SortControls";
import { Toast } from "../../components/Toast/Toast";

import "./Favorites.css";

const FAVORITES_EVENT =
  "pokelandia:favorites-changed";

const INITIAL_TOAST = {
  open: false,
  type: "info",
  title: "",
  message: "",
};

function sortPokemons(pokemons, sort) {
  const sortedPokemons = [...pokemons];

  switch (sort) {
    case "number-desc":
      return sortedPokemons.sort(
        (firstPokemon, secondPokemon) =>
          secondPokemon.id - firstPokemon.id
      );

    case "name-asc":
      return sortedPokemons.sort(
        (firstPokemon, secondPokemon) =>
          (
            firstPokemon.displayName ||
            firstPokemon.name
          ).localeCompare(
            secondPokemon.displayName ||
              secondPokemon.name,
            "es"
          )
      );

    case "name-desc":
      return sortedPokemons.sort(
        (firstPokemon, secondPokemon) =>
          (
            secondPokemon.displayName ||
            secondPokemon.name
          ).localeCompare(
            firstPokemon.displayName ||
              firstPokemon.name,
            "es"
          )
      );

    case "number-asc":
    default:
      return sortedPokemons.sort(
        (firstPokemon, secondPokemon) =>
          firstPokemon.id - secondPokemon.id
      );
  }
}

export function Favorites() {
  const [pokemons, setPokemons] = useState([]);
  const [sort, setSort] = useState("number-asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [toast, setToast] =
    useState(INITIAL_TOAST);

  const loadFavorites = useCallback(
    async ({
      showLoading = true,
    } = {}) => {
      const favoriteIds = getFavorites();

      if (showLoading) {
        setLoading(true);
      }

      setError("");

      if (favoriteIds.length === 0) {
        setPokemons([]);
        setLoading(false);
        return;
      }

      try {
        const favoritePokemons =
          await getPokemonCards(
            favoriteIds.map((id) => ({
              id,
            }))
          );

        setPokemons(favoritePokemons);
      } catch (requestError) {
        setError(
          requestError.message ||
            "No se pudieron cargar tus favoritos."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    function handleFavoritesChange() {
      loadFavorites({
        showLoading: false,
      });
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
  }, [loadFavorites]);

  const sortedPokemons = useMemo(
    () => sortPokemons(pokemons, sort),
    [pokemons, sort]
  );

  function handleFavoriteChange({
    isFavorite,
  }) {
    loadFavorites({
      showLoading: false,
    });

    if (!isFavorite) {
      setToast({
        open: true,
        type: "info",
        title: "Favorito eliminado",
        message:
          "El Pokémon fue eliminado de tu colección.",
      });
    }
  }

  function handleClearFavorites() {
    clearFavorites();
    setPokemons([]);

    window.dispatchEvent(
      new CustomEvent(FAVORITES_EVENT, {
        detail: {
          favorites: [],
        },
      })
    );

    setToast({
      open: true,
      type: "success",
      title: "Colección vaciada",
      message:
        "Todos los Pokémon fueron eliminados de favoritos.",
    });
  }

  function handleCloseToast() {
    setToast((currentToast) => ({
      ...currentToast,
      open: false,
    }));
  }

  if (loading) {
    return (
      <main className="favorites page">
        <div className="favorites__container container--wide">
          <Loader
            title="Cargando favoritos..."
            description="Preparando tu colección de Pokémon."
            size="large"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="favorites page">
      <div className="favorites__container container--wide">
        <header className="favorites__header animate-fade-in-up">
          <div className="favorites__heading">
            <span className="favorites__eyebrow">
              <FaHeart aria-hidden="true" />
              Tu colección
            </span>

            <h1 className="page__title">
              Pokémon favoritos
            </h1>

            <p className="page__description">
              Guarda tus criaturas preferidas y accede
              rápidamente a sus detalles desde un solo lugar.
            </p>
          </div>

          <div className="favorites__summary">
            <strong>
              {pokemons.length}
            </strong>

            <span>
              {pokemons.length === 1
                ? "Pokémon guardado"
                : "Pokémon guardados"}
            </span>
          </div>
        </header>

        {error && (
          <div
            className="favorites__notice"
            role="alert"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadFavorites()
              }
            >
              Reintentar
            </button>
          </div>
        )}

        {pokemons.length > 0 ? (
          <>
            <section className="favorites__toolbar">
              <SortControls
                value={sort}
                onChange={setSort}
                compact
              />

              <button
                type="button"
                className="favorites__clearButton"
                onClick={handleClearFavorites}
              >
                <FaTrashAlt aria-hidden="true" />
                Vaciar favoritos
              </button>
            </section>

            <section
              className="favorites__grid"
              aria-label="Pokémon favoritos"
            >
              {sortedPokemons.map(
                (pokemon, index) => (
                  <div
                    key={pokemon.id}
                    className="favorites__card animate-fade-in-up"
                    style={{
                      animationDelay: `${
                        index * 40
                      }ms`,
                    }}
                  >
                    <PokemonCard
                      pokemon={pokemon}
                      onFavoriteChange={
                        handleFavoriteChange
                      }
                    />
                  </div>
                )
              )}
            </section>
          </>
        ) : (
          <section className="favorites__empty">
            <div className="favorites__emptyIcon">
              <FaHeart aria-hidden="true" />
            </div>

            <h2>
              Todavía no tienes favoritos
            </h2>

            <p>
              Explora la Pokédex y utiliza el corazón de
              cada tarjeta para guardar los Pokémon que
              más te gusten.
            </p>

            <Link
              to="/list-pokemon"
              className="button button--primary"
            >
              Explorar Pokédex
            </Link>
          </section>
        )}
      </div>

      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={handleCloseToast}
      />
    </main>
  );
}