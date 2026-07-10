// Header.jsx
// Muestra la navegación principal, el menú mobile y el cambio de tema.

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaBars,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaLayerGroup,
  FaMoon,
  FaSearch,
  FaSun,
  FaTimes,
} from "react-icons/fa";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";

import "./Header.css";

const NAV_LINKS = [
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
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const headerRef = useRef(null);
  const location = useLocation();

  const {
    isDarkMode,
    toggleTheme,
  } = useContext(ThemeContext);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target
        )
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );

      document.addEventListener(
        "keydown",
        handleEscapeKey
      );

      document.body.classList.add(
        "no-scroll"
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscapeKey
      );

      document.body.classList.remove(
        "no-scroll"
      );
    };
  }, [isMenuOpen]);

  function toggleMenu() {
    setIsMenuOpen(
      (currentState) => !currentState
    );
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleThemeChange() {
    toggleTheme();

    if (window.innerWidth <= 900) {
      closeMenu();
    }
  }

  return (
    <header
      ref={headerRef}
      className="header"
    >
      <div className="header__container container--wide">
        <Link
          to="/"
          className="header__brand"
          aria-label="Ir al inicio de PokéLandia"
          onClick={closeMenu}
        >
          <img
            src="poke-logo.png"
            alt="PokéLandia"
            className="header__logo"
          />
        </Link>

        <button
          type="button"
          className={
            isMenuOpen
              ? "header__menuButton header__menuButton--open"
              : "header__menuButton"
          }
          aria-label={
            isMenuOpen
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          <span className="header__menuIcon">
            {isMenuOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
          </span>
        </button>

        <div
          className={
            isMenuOpen
              ? "header__backdrop header__backdrop--visible"
              : "header__backdrop"
          }
          aria-hidden="true"
          onClick={closeMenu}
        />

        <nav
          id="main-navigation"
          className={
            isMenuOpen
              ? "header__navigation header__navigation--open"
              : "header__navigation"
          }
          aria-label="Navegación principal"
        >
          <div className="header__navigationHeader">
            <span className="header__navigationTitle">
              Navegación
            </span>

            <button
              type="button"
              className="header__navigationClose"
              aria-label="Cerrar menú"
              onClick={closeMenu}
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <ul className="header__links">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({
                      isActive,
                    }) =>
                      isActive
                        ? "header__link header__link--active"
                        : "header__link"
                    }
                    onClick={closeMenu}
                  >
                    <span className="header__linkIcon">
                      <Icon aria-hidden="true" />
                    </span>

                    <span className="header__linkText">
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="header__navigationFooter">
            <button
              type="button"
              className="header__themeButton"
              aria-label={
                isDarkMode
                  ? "Cambiar a tema claro"
                  : "Cambiar a tema oscuro"
              }
              title={
                isDarkMode
                  ? "Cambiar a tema claro"
                  : "Cambiar a tema oscuro"
              }
              onClick={handleThemeChange}
            >
              <span className="header__themeIcon">
                {isDarkMode ? (
                  <FaSun aria-hidden="true" />
                ) : (
                  <FaMoon aria-hidden="true" />
                )}
              </span>

              <span className="header__themeText">
                {isDarkMode
                  ? "Tema claro"
                  : "Tema oscuro"}
              </span>
            </button>

            <Link
              to="/contact"
              className="header__contactLink"
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}