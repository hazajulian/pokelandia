// Footer.jsx
// Muestra información del proyecto, enlaces útiles y créditos.

import { Link } from "react-router-dom";

import {
  FaExternalLinkAlt,
  FaGithub,
  FaHeart,
  FaInfoCircle,
  FaLayerGroup,
  FaEnvelope,
  FaHome,
  FaSearch,
} from "react-icons/fa";

import pokemonLogo from "../../assets/poke-logo.png";

import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

const NAVIGATION_LINKS = [
  {
    label: "Inicio",
    path: "/",
    icon: FaHome,
  },
  {
    label: "Pokédex",
    path: "/list-pokemon",
    icon: FaSearch,
  },
  {
    label: "Tipos",
    path: "/pokemon-tipos",
    icon: FaLayerGroup,
  },
  {
    label: "Favoritos",
    path: "/favoritos",
    icon: FaHeart,
  },
  {
    label: "Acerca de",
    path: "/about",
    icon: FaInfoCircle,
  },
  {
    label: "Contacto",
    path: "/contact",
    icon: FaEnvelope,
  },
];

const RESOURCE_LINKS = [
  {
    label: "PokéAPI",
    href: "https://pokeapi.co/",
    icon: FaExternalLinkAlt,
  },
  {
    label: "Repositorio",
    href: "https://github.com/hazajulian/pokelandia",
    icon: FaGithub,
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container--wide">
        <div className="footer__content">
          <section className="footer__brand">
            <Link
              to="/"
              className="footer__logoLink"
              aria-label="Ir al inicio de PokéLandia"
            >
              <img
                src={pokemonLogo}
                alt="Logo de PokéLandia"
                className="footer__logo"
              />
            </Link>

            <p className="footer__description">
              Explora Pokémon, consulta sus estadísticas,
              habilidades y características, descubre criaturas
              por tipo y guarda tus favoritas.
            </p>

            <Link
              to="/list-pokemon"
              className="footer__primaryLink"
            >
              Explorar Pokédex
              <FaSearch aria-hidden="true" />
            </Link>
          </section>

          <section className="footer__section">
            <h2 className="footer__title">
              Navegación
            </h2>

            <ul className="footer__links footer__links--navigation">
              {NAVIGATION_LINKS.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="footer__link"
                    >
                      <span className="footer__linkIcon">
                        <Icon aria-hidden="true" />
                      </span>

                      <span>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="footer__section">
            <h2 className="footer__title">
              Recursos
            </h2>

            <ul className="footer__links">
              {RESOURCE_LINKS.map((resource) => {
                const Icon = resource.icon;

                return (
                  <li key={resource.label}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__link footer__link--external"
                    >
                      <span className="footer__linkIcon">
                        <Icon aria-hidden="true" />
                      </span>

                      <span>
                        {resource.label}
                      </span>

                      <FaExternalLinkAlt
                        className="footer__externalIcon"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="footer__projectNotice">
              <strong>
                Proyecto educativo
              </strong>

              <p>
                Aplicación Frontend desarrollada con React,
                React Router, Vite y PokéAPI.
              </p>
            </div>
          </section>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__credits">
            <p className="footer__copyright">
              © {CURRENT_YEAR} PokéLandia.
            </p>

            <p>
              Proyecto desarrollado por{" "}
              <a
                href="https://github.com/hazajulian"
                target="_blank"
                rel="noreferrer"
                className="footer__author"
              >
                Julián Haza
                <FaGithub aria-hidden="true" />
              </a>
            </p>
          </div>

          <p className="footer__disclaimer">
            Sitio educativo y no oficial. Pokémon y sus elementos
            relacionados pertenecen a Nintendo, Game Freak y The
            Pokémon Company.
          </p>
        </div>
      </div>
    </footer>
  );
}