// HomeHero.jsx
// Hero principal de la página de inicio.

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import homeHero from "../../../assets/home-hero.png";

import "./HomeHero.css";

export function HomeHero() {
  return (
    <section
      className="homeHero"
      style={{
        "--home-hero-image": `url(${homeHero})`,
      }}
    >
      <div className="homeHero__overlay" />

      <div className="homeHero__container container">
        <div className="homeHero__content animate-fade-in-up">
          <span className="homeHero__eyebrow">
            Explora, descubre y aprende
          </span>

          <h1 className="homeHero__title">
            Bienvenido a
            <span> PokéLandia</span>
          </h1>

          <p className="homeHero__description">
            Descubre información sobre tus Pokémon favoritos,
            explora la Pokédex y encuentra nuevas criaturas
            utilizando filtros por tipo.
          </p>

          <div className="homeHero__actions">
            <Link
              to="/list-pokemon"
              className="button button--primary homeHero__button"
            >
              Explorar Pokédex
              <FaArrowRight aria-hidden="true" />
            </Link>

            <Link
              to="/pokemon-tipos"
              className="button button--secondary homeHero__button"
            >
              Ver tipos
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#explorar"
        className="homeHero__scroll"
        aria-label="Ir a las funciones principales"
      >
        Descubrir más
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}