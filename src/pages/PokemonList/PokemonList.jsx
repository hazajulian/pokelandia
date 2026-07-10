// PokemonList.jsx
// Muestra la Pokédex principal con carga progresiva de Pokémon.

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaArrowDown,
  FaArrowUp,
  FaRedoAlt,
} from "react-icons/fa";

import { Loader } from "../../components/Loader/Loader";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import { SortControls } from "../../components/SortControls/SortControls";

import {
  getPokemonCards,
  getPokemonList,
} from "../../services/api";

import "./PokemonList.css";

const PAGE_SIZE = 20;

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

export function PokemonList() {
  const [pokemons, setPokemons] =
    useState([]);

  const [
    totalPokemons,
    setTotalPokemons,
  ] = useState(0);

  const [offset, setOffset] =
    useState(0);

  const [sort, setSort] =
    useState("number-asc");

  const [loading, setLoading] =
    useState(true);

  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let ignoreRequest = false;

    async function loadInitialPokemons() {
      setLoading(true);
      setError("");

      try {
        const listData =
          await getPokemonList({
            offset: 0,
            limit: PAGE_SIZE,
          });

        const cardData =
          await getPokemonCards(
            listData.results
          );

        if (ignoreRequest) {
          return;
        }

        setPokemons(cardData);
        setTotalPokemons(
          listData.count
        );
        setOffset(PAGE_SIZE);
      } catch (requestError) {
        if (!ignoreRequest) {
          setError(
            requestError.message ||
              "No se pudo cargar la Pokédex."
          );
        }
      } finally {
        if (!ignoreRequest) {
          setLoading(false);
        }
      }
    }

    loadInitialPokemons();

    return () => {
      ignoreRequest = true;
    };
  }, []);

  const sortedPokemons = useMemo(
    () => sortPokemons(pokemons, sort),
    [pokemons, sort]
  );

  const canLoadMore =
    pokemons.length < totalPokemons;

  const canLoadLess =
    pokemons.length > PAGE_SIZE;

  async function handleLoadMore() {
    if (
      loadingMore ||
      !canLoadMore
    ) {
      return;
    }

    setLoadingMore(true);
    setError("");

    try {
      const listData =
        await getPokemonList({
          offset,
          limit: PAGE_SIZE,
        });

      const cardData =
        await getPokemonCards(
          listData.results
        );

      setPokemons(
        (currentPokemons) => {
          const currentIds =
            new Set(
              currentPokemons.map(
                (pokemon) =>
                  pokemon.id
              )
            );

          const newPokemons =
            cardData.filter(
              (pokemon) =>
                !currentIds.has(
                  pokemon.id
                )
            );

          return [
            ...currentPokemons,
            ...newPokemons,
          ];
        }
      );

      setOffset(
        (currentOffset) =>
          currentOffset + PAGE_SIZE
      );
    } catch (requestError) {
      setError(
        requestError.message ||
          "No se pudieron cargar más Pokémon."
      );
    } finally {
      setLoadingMore(false);
    }
  }

  function handleLoadLess() {
    setPokemons(
      (currentPokemons) => {
        const nextLength =
          Math.max(
            PAGE_SIZE,
            currentPokemons.length -
              PAGE_SIZE
          );

        return currentPokemons.slice(
          0,
          nextLength
        );
      }
    );

    setOffset(
      (currentOffset) =>
        Math.max(
          PAGE_SIZE,
          currentOffset -
            PAGE_SIZE
        )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleRetry() {
    window.location.reload();
  }

  if (loading) {
    return (
      <main className="pokemonList page">
        <div className="pokemonList__container container--wide">
          <Loader
            title="Cargando la Pokédex..."
            description="Preparando los Pokémon y toda su información."
            size="large"
          />
        </div>
      </main>
    );
  }

  if (
    error &&
    pokemons.length === 0
  ) {
    return (
      <main className="pokemonList page">
        <div className="pokemonList__container container--wide">
          <div
            className="pokemonList__error"
            role="alert"
          >
            <h1>
              No pudimos cargar la
              Pokédex
            </h1>

            <p>{error}</p>

            <button
              type="button"
              className="button button--primary"
              onClick={handleRetry}
            >
              <FaRedoAlt aria-hidden="true" />
              Intentar nuevamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pokemonList page">
      <div className="pokemonList__container container--wide">
        <header className="pokemonList__header animate-fade-in-up">
          <div className="pokemonList__heading">
            <span className="pokemonList__eyebrow">
              Pokédex nacional
            </span>

            <h1 className="page__title">
              Explora todos los Pokémon
            </h1>

            <p className="page__description">
              Descubre sus tipos,
              consulta sus detalles y
              guarda tus criaturas
              favoritas.
            </p>
          </div>

          <div className="pokemonList__summary">
            <strong>
              {pokemons.length}
            </strong>

            <span>
              de{" "}
              {totalPokemons.toLocaleString(
                "es-AR"
              )}{" "}
              Pokémon cargados
            </span>
          </div>
        </header>

        <section className="pokemonList__toolbar">
          <SortControls
            id="pokemon-list-sort"
            value={sort}
            onChange={setSort}
            compact
          />
        </section>

        {error && (
          <div
            className="pokemonList__notice"
            role="alert"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              Reintentar
            </button>
          </div>
        )}

        {sortedPokemons.length > 0 ? (
          <section
            className="pokemonList__grid"
            aria-label="Listado de Pokémon"
          >
            {sortedPokemons.map(
              (pokemon, index) => (
                <div
                  key={pokemon.id}
                  className="pokemonList__card animate-fade-in-up"
                  style={{
                    animationDelay: `${
                      (index %
                        PAGE_SIZE) *
                      35
                    }ms`,
                  }}
                >
                  <PokemonCard
                    pokemon={pokemon}
                  />
                </div>
              )
            )}
          </section>
        ) : (
          <div className="pokemonList__empty">
            <h2>
              No encontramos resultados
            </h2>

            <p>
              No hay Pokémon disponibles
              para mostrar.
            </p>
          </div>
        )}

        <div className="pokemonList__actions">
          {canLoadLess && (
            <button
              type="button"
              className="button button--ghost pokemonList__action"
              onClick={handleLoadLess}
              disabled={loadingMore}
            >
              <FaArrowUp aria-hidden="true" />
              Mostrar menos
            </button>
          )}

          {canLoadMore && (
            <button
              type="button"
              className="button button--primary pokemonList__action"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <span
                    className="pokemonList__buttonSpinner"
                    aria-hidden="true"
                  />
                  Cargando...
                </>
              ) : (
                <>
                  <FaArrowDown aria-hidden="true" />
                  Mostrar más
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}