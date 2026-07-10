// SortControls.jsx
// Permite ordenar los Pokémon mediante un desplegable personalizado.

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";

import {
  FaArrowDownAZ,
  FaArrowDownZA,
  FaHashtag,
} from "react-icons/fa6";

import "./SortControls.css";

const SORT_OPTIONS = [
  {
    value: "number-asc",
    label: "Número: menor a mayor",
    icon: FaHashtag,
  },
  {
    value: "number-desc",
    label: "Número: mayor a menor",
    icon: FaHashtag,
  },
  {
    value: "name-asc",
    label: "Nombre: A-Z",
    icon: FaArrowDownAZ,
  },
  {
    value: "name-desc",
    label: "Nombre: Z-A",
    icon: FaArrowDownZA,
  },
];

export function SortControls({
  value = "number-asc",
  onChange,
  label = "Ordenar por",
  compact = false,
  className = "",
  id = "pokemon-sort",
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const controlsRef = useRef(null);

  const controlsClassName = [
    "sortControls",
    compact
      ? "sortControls--compact"
      : "",
    isOpen
      ? "sortControls--open"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const selectedOption =
    SORT_OPTIONS.find(
      (option) =>
        option.value === value
    ) || SORT_OPTIONS[0];

  const SelectedIcon =
    selectedOption.icon;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscapeKey
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscapeKey
      );
    };
  }, []);

  function toggleDropdown() {
    setIsOpen(
      (currentState) =>
        !currentState
    );
  }

  function handleOptionSelect(
    optionValue
  ) {
    onChange?.(optionValue);
    setIsOpen(false);
  }

  function handleTriggerKeyDown(event) {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      setIsOpen(true);
    }
  }

  return (
    <div
      ref={controlsRef}
      className={controlsClassName}
    >
      <span
        id={`${id}-label`}
        className="sortControls__label"
      >
        {label}
      </span>

      <div className="sortControls__dropdown">
        <button
          id={id}
          type="button"
          className="sortControls__trigger"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${id}-label ${id}`}
          onClick={toggleDropdown}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className="sortControls__selectedIcon">
            <SelectedIcon
              aria-hidden="true"
            />
          </span>

          <span className="sortControls__selectedLabel">
            {selectedOption.label}
          </span>

          <FaChevronDown
            className="sortControls__chevron"
            aria-hidden="true"
          />
        </button>

        <div
          className={
            isOpen
              ? "sortControls__menu sortControls__menu--open"
              : "sortControls__menu"
          }
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {SORT_OPTIONS.map(
            (option) => {
              const Icon = option.icon;

              const isSelected =
                option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={
                    isSelected
                  }
                  className={
                    isSelected
                      ? "sortControls__option sortControls__option--selected"
                      : "sortControls__option"
                  }
                  onClick={() =>
                    handleOptionSelect(
                      option.value
                    )
                  }
                >
                  <span className="sortControls__optionIcon">
                    <Icon
                      aria-hidden="true"
                    />
                  </span>

                  <span className="sortControls__optionLabel">
                    {option.label}
                  </span>

                  {isSelected && (
                    <FaCheck
                      className="sortControls__check"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}