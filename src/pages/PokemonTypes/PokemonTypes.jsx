// PokemonTypes.jsx
// Permite explorar Pokémon agrupados por tipo.

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaArrowDown,
  FaArrowUp,
  FaFilter,
  FaRedoAlt,
} from "react-icons/fa";

import { Loader } from "../../components/Loader/Loader";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";
import { SortControls } from "../../components/SortControls/SortControls";

import {
  getPokemonCards,
  getPokemonList,
  getPokemonTypes,
  getType,
} from "../../services/api";

import "./PokemonTypes.css";

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

export function PokemonTypes() {
  const [types, setTypes] =
    useState([]);

  const [
    selectedType,
    setSelectedType,
  ] = useState("all");

  const [pokemons, setPokemons] =
    useState([]);

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(PAGE_SIZE);

  const [sort, setSort] =
    useState("number-asc");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTypes() {
      setLoading(true);
      setError("");

      try {
        const pokemonTypes =
          await getPokemonTypes();

        if (ignore) {
          return;
        }

        setTypes([
          {
            id: 0,
            name: "all",
            displayName: "Todos",
          },
          ...pokemonTypes,
        ]);
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError.message ||
              "No se pudieron cargar los tipos."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTypes();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadPokemons() {
      setLoading(true);
      setError("");

      try {
        let pokemonList = [];

        if (selectedType === "all") {
          const response =
            await getPokemonList({
              offset: 0,
              limit: 151,
            });

          pokemonList = response.results;
        } else {
          const response =
            await getType(selectedType);

          pokemonList = response.pokemon;
        }

        const cards =
          await getPokemonCards(
            pokemonList
          );

        if (ignore) {
          return;
        }

        setPokemons(cards);
        setVisibleCount(PAGE_SIZE);
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError.message ||
              "No se pudieron cargar los Pokémon."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      ignore = true;
    };
  }, [selectedType]);

  const sortedPokemons = useMemo(
    () => sortPokemons(pokemons, sort),
    [pokemons, sort]
  );

  const visiblePokemons =
    sortedPokemons.slice(
      0,
      visibleCount
    );

  function handleRetry() {
    window.location.reload();
  }

  function handleLoadMore() {
    setVisibleCount(
      (currentCount) =>
        currentCount + PAGE_SIZE
    );
  }

  function handleLoadLess() {
    setVisibleCount(PAGE_SIZE);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (loading) {
    return (
      <main className="pokemonTypes page">
        <div className="pokemonTypes__container container--wide">
          <Loader
            title="Cargando tipos de Pokémon..."
            description="Preparando los filtros y las criaturas disponibles."
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
      <main className="pokemonTypes page">
        <div className="pokemonTypes__container container--wide">
          <div
            className="pokemonTypes__error"
            role="alert"
          >
            <h1>
              No pudimos cargar los
              tipos
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
    <main className="pokemonTypes page">
      <div className="pokemonTypes__container container--wide">
        <header className="pokemonTypes__header animate-fade-in-up">
          <div>
            <span className="pokemonTypes__eyebrow">
              <FaFilter aria-hidden="true" />
              Filtros
            </span>

            <h1 className="page__title">
              Explora por tipo
            </h1>

            <p className="page__description">
              Descubre todos los
              Pokémon pertenecientes a
              un tipo específico.
            </p>
          </div>

          <div className="pokemonTypes__summary">
            <strong>
              {pokemons.length}
            </strong>

            <span>
              Pokémon encontrados
            </span>
          </div>
        </header>

        <section className="pokemonTypes__filters">
          {types.map((type) => (
            <button
              key={type.name}
              type="button"
              className={
                selectedType ===
                type.name
                  ? "pokemonTypes__filter pokemonTypes__filter--active"
                  : "pokemonTypes__filter"
              }
              onClick={() =>
                setSelectedType(
                  type.name
                )
              }
            >
              {type.displayName}
            </button>
          ))}
        </section>

        <section className="pokemonTypes__toolbar">
          <SortControls
            id="pokemon-types-sort"
            value={sort}
            onChange={setSort}
            compact
          />
        </section>

        {visiblePokemons.length > 0 ? (
          <>
            <section
              className="pokemonTypes__grid"
              aria-label="Pokémon filtrados por tipo"
            >
              {visiblePokemons.map(
                (pokemon, index) => (
                  <div
                    key={pokemon.id}
                    className="pokemonTypes__card animate-fade-in-up"
                    style={{
                      animationDelay: `${
                        (index %
                          PAGE_SIZE) *
                        30
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

            <div className="pokemonTypes__actions">
              {visibleCount >
                PAGE_SIZE && (
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={handleLoadLess}
                >
                  <FaArrowUp aria-hidden="true" />
                  Mostrar menos
                </button>
              )}

              {visibleCount <
                sortedPokemons.length && (
                <button
                  type="button"
                  className="button button--primary"
                  onClick={handleLoadMore}
                >
                  <FaArrowDown aria-hidden="true" />
                  Mostrar más
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="pokemonTypes__empty">
            <h2>
              No encontramos resultados
            </h2>

            <p>
              Prueba seleccionando otro
              tipo de Pokémon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}