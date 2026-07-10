// Searcher.jsx
// Permite buscar un Pokémon por nombre o número.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import "./Searcher.css";

export function Searcher() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const normalizedSearch = search
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return;
    }

    navigate(`/pokemon/${normalizedSearch}`);
  }

  function handleClearSearch() {
    setSearch("");
  }

  return (
    <section
      className="searcher"
      aria-label="Buscador de Pokémon"
    >
      <div className="searcher__container container--wide">
        <form
          className="searcher__form"
          onSubmit={handleSearch}
        >
          <div className="searcher__field">
            <FaSearch
              className="searcher__fieldIcon"
              aria-hidden="true"
            />

            <label
              htmlFor="pokemon-search"
              className="visually-hidden"
            >
              Buscar Pokémon por nombre o número
            </label>

            <input
              id="pokemon-search"
              className="searcher__input"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Busca por nombre o número"
              autoComplete="off"
              spellCheck="false"
            />

            {search && (
              <button
                type="button"
                className="searcher__clearButton"
                aria-label="Limpiar búsqueda"
                title="Limpiar búsqueda"
                onClick={handleClearSearch}
              >
                <FaTimes aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="searcher__button button button--primary"
            disabled={!search.trim()}
          >
            <FaSearch aria-hidden="true" />
            Buscar
          </button>
        </form>

        <p className="searcher__help">
          Puedes buscar por nombre, por ejemplo
          <strong> Pikachu</strong>, o por número,
          por ejemplo <strong>25</strong>.
        </p>
      </div>
    </section>
  );
}