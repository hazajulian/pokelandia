// PokemonCard.jsx
// Muestra la información principal de un Pokémon en una tarjeta reutilizable.

import { Link } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";

import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { TypeBadge } from "../TypeBadge/TypeBadge";

import {
  formatName,
  formatPokedexNumber,
} from "../../utils/formatPokemon";

import {
  getPokemonTypeStyles,
  getPrimaryPokemonType,
} from "../../utils/pokemonTypes";

import "./PokemonCard.css";

export function PokemonCard({
  pokemon,
  showFavoriteButton = true,
  onFavoriteChange,
}) {
  if (!pokemon) {
    return null;
  }

  const {
    id,
    name,
    displayName,
    image,
    sprite,
    types = [],
  } = pokemon;

  const pokemonName =
    displayName || formatName(name);

  const pokemonImage =
    image || sprite;

  const primaryType =
    getPrimaryPokemonType(types);

  const cardStyles =
    getPokemonTypeStyles(primaryType);

  return (
    <article
      className="pokemonCard"
      style={cardStyles}
    >
      <div className="pokemonCard__top">
        <span className="pokemonCard__number">
          {formatPokedexNumber(id)}
        </span>

        {showFavoriteButton && (
          <FavoriteButton
            pokemonId={id}
            pokemonName={pokemonName}
            variant="card"
            onChange={onFavoriteChange}
            className="pokemonCard__favorite"
          />
        )}
      </div>

      <Link
        to={`/pokemon/${id}`}
        className="pokemonCard__main"
        aria-label={`Ver información de ${pokemonName}`}
      >
        <div className="pokemonCard__imageBox">
          <div
            className="pokemonCard__backgroundCircle"
            aria-hidden="true"
          />

          {pokemonImage ? (
            <img
              src={pokemonImage}
              alt={pokemonName}
              className="pokemonCard__image"
              loading="lazy"
            />
          ) : (
            <div className="pokemonCard__imageFallback">
              <span>?</span>
            </div>
          )}
        </div>

        <div className="pokemonCard__content">
          <h2 className="pokemonCard__name">
            {pokemonName}
          </h2>

          <div
            className="pokemonCard__types"
            aria-label={`Tipos de ${pokemonName}`}
          >
            {types.map((type) => (
              <TypeBadge
                key={type.name}
                type={type.name}
                displayName={type.displayName}
                variant="card"
              />
            ))}
          </div>

          <span className="pokemonCard__link">
            Ver detalles
            <FaArrowRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}