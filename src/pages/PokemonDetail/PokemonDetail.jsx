// PokemonDetail.jsx
// Muestra la información completa de un Pokémon seleccionado.

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaBolt,
  FaRedoAlt,
  FaRulerVertical,
  FaStar,
  FaWeightHanging,
} from "react-icons/fa";

import { FavoriteButton } from "../../components/FavoriteButton/FavoriteButton";
import { Loader } from "../../components/Loader/Loader";
import { TypeBadge } from "../../components/TypeBadge/TypeBadge";

import { getPokemonDetail } from "../../services/api";

import {
  formatAbilityType,
  formatColorName,
  formatHabitatName,
  formatName,
  formatPokedexNumber,
  formatPokemonHeight,
  formatPokemonWeight,
  formatShapeName,
  formatStatName,
  getPokemonCategory,
  getStatPercentage,
  getStatsTotal,
} from "../../utils/formatPokemon";

import {
  getPokemonTypeStyles,
  getPrimaryPokemonType,
} from "../../utils/pokemonTypes";

import "./PokemonDetail.css";

export function PokemonDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [pokemon, setPokemon] =
    useState(null);

  const [showShiny, setShowShiny] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let ignoreRequest = false;

    async function loadPokemon() {
      setLoading(true);
      setError("");
      setPokemon(null);
      setShowShiny(false);

      try {
        const pokemonData =
          await getPokemonDetail(id);

        if (ignoreRequest) {
          return;
        }

        setPokemon(pokemonData);
      } catch (requestError) {
        if (!ignoreRequest) {
          setError(
            requestError.message ||
              "No se pudo cargar este Pokémon."
          );
        }
      } finally {
        if (!ignoreRequest) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      ignoreRequest = true;
    };
  }, [id]);

  function handleGoBack() {
    navigate(-1);
  }

  function handleRetry() {
    window.location.reload();
  }

  function handleImageChange() {
    if (!pokemon?.shinyImage) {
      return;
    }

    setShowShiny(
      (currentState) => !currentState
    );
  }

  if (loading) {
    return (
      <main className="pokemonDetail page">
        <div className="pokemonDetail__container container">
          <Loader
            title="Cargando información..."
            description="Preparando todos los datos de este Pokémon."
            size="large"
          />
        </div>
      </main>
    );
  }

  if (error || !pokemon) {
    return (
      <main className="pokemonDetail page">
        <div className="pokemonDetail__container container">
          <div
            className="pokemonDetail__error"
            role="alert"
          >
            <h1>
              No encontramos este Pokémon
            </h1>

            <p>
              {error ||
                "El Pokémon solicitado no está disponible."}
            </p>

            <div className="pokemonDetail__errorActions">
              <button
                type="button"
                className="button button--ghost"
                onClick={handleGoBack}
              >
                <FaArrowLeft aria-hidden="true" />
                Volver
              </button>

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
        </div>
      </main>
    );
  }

  const primaryType =
    getPrimaryPokemonType(
      pokemon.types
    );

  const detailStyles =
    getPokemonTypeStyles(primaryType);

  const pokemonCategory =
    getPokemonCategory({
      isLegendary:
        pokemon.isLegendary,
      isMythical:
        pokemon.isMythical,
    });

  const currentImage =
    showShiny && pokemon.shinyImage
      ? pokemon.shinyImage
      : pokemon.image;

  const statsTotal =
    getStatsTotal(pokemon.stats);

  return (
    <main
      className="pokemonDetail page"
      style={detailStyles}
    >
      <div className="pokemonDetail__container container">
        <div className="pokemonDetail__topActions">
          <button
            type="button"
            className="button button--ghost pokemonDetail__backButton"
            onClick={handleGoBack}
          >
            <FaArrowLeft aria-hidden="true" />
            Volver
          </button>

          <FavoriteButton
            pokemonId={pokemon.id}
            pokemonName={pokemon.displayName}
            variant="detail"
            showText
            className="pokemonDetail__favorite"
          />
        </div>

        <section className="pokemonDetail__hero animate-fade-in-up">
          <div className="pokemonDetail__visual">
            <div className="pokemonDetail__imageBackground">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={
                    showShiny
                      ? `${pokemon.displayName} variocolor`
                      : pokemon.displayName
                  }
                  className="pokemonDetail__image"
                />
              ) : (
                <div className="pokemonDetail__imageFallback">
                  ?
                </div>
              )}
            </div>

            {pokemon.shinyImage && (
              <button
                type="button"
                className="pokemonDetail__shinyButton"
                onClick={handleImageChange}
              >
                <FaStar aria-hidden="true" />

                {showShiny
                  ? "Ver forma normal"
                  : "Ver variocolor"}
              </button>
            )}
          </div>

          <div className="pokemonDetail__intro">
            <div className="pokemonDetail__introTop">
              <span className="pokemonDetail__number">
                {formatPokedexNumber(
                  pokemon.id
                )}
              </span>

              <span className="pokemonDetail__category">
                {pokemonCategory}
              </span>
            </div>

            <h1 className="pokemonDetail__title">
              {pokemon.displayName}
            </h1>

            {pokemon.genus && (
              <p className="pokemonDetail__genus">
                {pokemon.genus}
              </p>
            )}

            <div className="pokemonDetail__types">
              {pokemon.types.map((type) => (
                <TypeBadge
                  key={type.name}
                  type={type.name}
                  displayName={type.displayName}
                  variant="detail"
                  className="pokemonDetail__type"
                />
              ))}
            </div>

            <p className="pokemonDetail__description">
              {pokemon.description}
            </p>

            <div className="pokemonDetail__quickData">
              <article className="pokemonDetail__quickItem">
                <FaRulerVertical aria-hidden="true" />

                <div>
                  <span>Altura</span>

                  <strong>
                    {formatPokemonHeight(
                      pokemon.height
                    )}
                  </strong>
                </div>
              </article>

              <article className="pokemonDetail__quickItem">
                <FaWeightHanging aria-hidden="true" />

                <div>
                  <span>Peso</span>

                  <strong>
                    {formatPokemonWeight(
                      pokemon.weight
                    )}
                  </strong>
                </div>
              </article>

              <article className="pokemonDetail__quickItem">
                <FaBolt aria-hidden="true" />

                <div>
                  <span>
                    Experiencia base
                  </span>

                  <strong>
                    {pokemon.baseExperience ??
                      "No disponible"}
                  </strong>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pokemonDetail__section">
          <header className="pokemonDetail__sectionHeader">
            <div>
              <span>
                Rendimiento
              </span>

              <h2>
                Estadísticas base
              </h2>
            </div>

            <div className="pokemonDetail__statsTotal">
              <strong>
                {statsTotal}
              </strong>

              <span>Total</span>
            </div>
          </header>

          <div className="pokemonDetail__stats">
            {pokemon.stats.map((stat) => (
              <article
                key={stat.name}
                className="pokemonDetail__stat"
              >
                <div className="pokemonDetail__statHeader">
                  <span>
                    {formatStatName(
                      stat.name
                    )}
                  </span>

                  <strong>
                    {stat.value}
                  </strong>
                </div>

                <div className="pokemonDetail__statTrack">
                  <span
                    className="pokemonDetail__statFill"
                    style={{
                      width: `${getStatPercentage(
                        stat.value
                      )}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="pokemonDetail__columns">
          <section className="pokemonDetail__section">
            <header className="pokemonDetail__sectionHeader">
              <div>
                <span>
                  Características
                </span>

                <h2>
                  Habilidades
                </h2>
              </div>
            </header>

            <div className="pokemonDetail__abilities">
              {pokemon.abilities.map(
                (ability) => (
                  <article
                    key={ability.name}
                    className="pokemonDetail__ability"
                  >
                    <div className="pokemonDetail__abilityHeader">
                      <h3>
                        {ability.displayName ||
                          formatName(
                            ability.name
                          )}
                      </h3>

                      <span>
                        {formatAbilityType(
                          ability.isHidden
                        )}
                      </span>
                    </div>

                    <p>
                      {ability.description}
                    </p>
                  </article>
                )
              )}
            </div>
          </section>

          <section className="pokemonDetail__section">
            <header className="pokemonDetail__sectionHeader">
              <div>
                <span>
                  Información
                </span>

                <h2>
                  Datos adicionales
                </h2>
              </div>
            </header>

            <dl className="pokemonDetail__dataList">
              <div>
                <dt>Hábitat</dt>

                <dd>
                  {formatHabitatName(
                    pokemon.habitat
                  )}
                </dd>
              </div>

              <div>
                <dt>Color</dt>

                <dd>
                  {formatColorName(
                    pokemon.color
                  )}
                </dd>
              </div>

              <div>
                <dt>Forma</dt>

                <dd>
                  {formatShapeName(
                    pokemon.shape
                  )}
                </dd>
              </div>

              <div>
                <dt>
                  Tasa de captura
                </dt>

                <dd>
                  {pokemon.captureRate ??
                    "No disponible"}
                </dd>
              </div>

              <div>
                <dt>
                  Felicidad base
                </dt>

                <dd>
                  {pokemon.baseHappiness ??
                    "No disponible"}
                </dd>
              </div>

              <div>
                <dt>
                  Número de orden
                </dt>

                <dd>
                  {pokemon.order ??
                    "No disponible"}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {pokemon.moves.length > 0 && (
          <section className="pokemonDetail__section">
            <header className="pokemonDetail__sectionHeader">
              <div>
                <span>
                  Combate
                </span>

                <h2>
                  Algunos movimientos
                </h2>
              </div>
            </header>

            <div className="pokemonDetail__moves">
              {pokemon.moves.map(
                (move) => (
                  <span
                    key={move.name}
                    className="pokemonDetail__move"
                  >
                    {formatName(
                      move.name
                    )}
                  </span>
                )
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
} 