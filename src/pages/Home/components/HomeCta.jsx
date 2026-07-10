// HomeCta.jsx
// Llamado a la acción final de la página de inicio.

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import "./HomeCta.css";

export function HomeCta() {
  return (
    <section className="homeCta section">
      <div className="homeCta__container container">
        <div className="homeCta__content">
          <span className="home__eyebrow">
            ¿Listo para comenzar?
          </span>

          <h2>
            Encuentra tu próximo Pokémon favorito
          </h2>

          <p>
            Explora la Pokédex, consulta sus características y
            descubre criaturas que todavía no conocías.
          </p>
        </div>

        <Link
          to="/list-pokemon"
          className="button button--primary homeCta__button"
        >
          Abrir Pokédex
          <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}