// homeData.js
// Centraliza la información reutilizable de las secciones del Home.

import {
  FaBolt,
  FaBookOpen,
  FaHeart,
  FaLayerGroup,
  FaSearch,
  FaStar,
} from "react-icons/fa";

import homePokedex from "../../../assets/home-pokedex.png";
import homeTypes from "../../../assets/home-types.png";
import homeFavorites from "../../../assets/home-favorites.png";

export const HOME_FEATURES = [
  {
    id: "pokedex",
    title: "Explora la Pokédex",
    description:
      "Busca Pokémon, conoce sus estadísticas, habilidades y características principales.",
    image: homePokedex,
    imageAlt:
      "Ilustración promocional para explorar la Pokédex",
    icon: FaBookOpen,
    link: "/list-pokemon",
    linkText: "Explorar Pokédex",
  },
  {
    id: "types",
    title: "Descubre por tipos",
    description:
      "Filtra los Pokémon según su tipo y descubre nuevas criaturas de forma sencilla.",
    image: homeTypes,
    imageAlt:
      "Ilustración de Pokémon organizados por diferentes tipos",
    icon: FaLayerGroup,
    link: "/pokemon-tipos",
    linkText: "Ver tipos",
  },
  {
    id: "favorites",
    title: "Tus favoritos",
    description:
      "Guarda tus Pokémon preferidos y accede rápidamente a ellos desde tu colección.",
    image: homeFavorites,
    imageAlt:
      "Ilustración de diferentes Pokémon favoritos",
    icon: FaHeart,
    link: "/favoritos",
    linkText: "Ver favoritos",
  },
];

export const HOME_BENEFITS = [
  {
    id: "search",
    icon: FaSearch,
    title: "Búsqueda rápida",
    description:
      "Encuentra un Pokémon escribiendo su nombre o número en la Pokédex.",
  },
  {
    id: "filters",
    icon: FaBolt,
    title: "Filtros por tipo",
    description:
      "Explora criaturas de fuego, agua, planta, eléctrico y muchos tipos más.",
  },
  {
    id: "information",
    icon: FaStar,
    title: "Información detallada",
    description:
      "Consulta estadísticas, habilidades, movimientos y otros datos importantes.",
  },
];