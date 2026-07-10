// HomeAbout.jsx
// Sección que presenta información sobre PokéLandia.

import { Link } from "react-router-dom";

import "./HomeAbout.css";

export function HomeAbout() {
  return (
    <section className="homeAbout section">
      <div className="homeAbout__container container">
        <div className="homeAbout__content">
          <span className="home__eyebrow">
            Sobre PokéLandia
          </span>

          <h2 className="section__title">
            Una Pokédex sencilla para aprender y explorar
          </h2>

          <p>
            PokéLandia es un proyecto educativo desarrollado con
            React que consume información pública de PokéAPI.
            Permite buscar criaturas, consultar sus datos y
            descubrirlas mediante diferentes filtros.
          </p>

          <p>
            La aplicación no es oficial y fue creada como parte de
            un portfolio de desarrollo web.
          </p>

          <div className="homeAbout__actions">
            <Link
              to="/about"
              className="button button--secondary"
            >
              Conocer el proyecto
            </Link>

            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noreferrer"
              className="button button--ghost"
            >
              Visitar PokéAPI
            </a>
          </div>
        </div>

        <div className="homeAbout__visual">
          <div className="homeAbout__stat">
            <strong>1000+</strong>

            <span>
              Pokémon disponibles
            </span>
          </div>

          <div className="homeAbout__stat">
            <strong>18</strong>

            <span>
              Tipos diferentes
            </span>
          </div>

          <div className="homeAbout__stat">
            <strong>100%</strong>

            <span>
              Información gratuita
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}