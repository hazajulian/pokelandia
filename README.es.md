# PokéLandia

<p align="center">
  <img src="./public/poke-logo.png" alt="Logo de PokéLandia" width="260">
</p>

<p align="center">
  Una Pokédex moderna y responsive desarrollada con <strong>React</strong> y <strong>Vite</strong>, utilizando la API pública <strong>PokéAPI</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript" />
  <img src="https://img.shields.io/badge/CSS3-Moderno-1572B6?logo=css3" />
  <img src="https://img.shields.io/badge/API-PokéAPI-EF5350" />
  <img src="https://img.shields.io/badge/Responsive-Sí-success" />
</p>

---

# Vista previa

PokéLandia es una Pokédex moderna centrada en un diseño limpio, interfaces responsive y componentes reutilizables de React.

La aplicación permite explorar Pokémon, filtrarlos por tipo, consultar información detallada, guardar favoritos y alternar entre tema claro y oscuro.

---

# Características

- Diseño responsive
- Tema claro / oscuro
- Interfaz moderna
- Búsqueda de Pokémon
- Exploración por tipos
- Página de detalle de cada Pokémon
- Sistema de favoritos
- Animaciones suaves
- Componentes reutilizables
- Botón para volver arriba
- Página de contacto
- Página "Acerca de"
- Preparado para SEO
- Soporte Open Graph
- Twitter Cards
- Sitemap
- Robots.txt
- Manifest PWA

---

# Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- React Icons
- CSS3
- PokéAPI

---

# Estructura del proyecto

```text
src
│
├── assets
│
├── components
│   ├── FavoriteButton
│   ├── Footer
│   ├── Header
│   ├── Loader
│   ├── PokemonCard
│   ├── ScrollToTop
│   ├── Searcher
│   ├── SortControls
│   ├── Toast
│   └── TypeBadge
│
├── context
│
├── pages
│   ├── About
│   ├── Contact
│   ├── Favorites
│   ├── Home
│   ├── PokemonDetail
│   ├── PokemonList
│   └── PokemonTypes
│
├── services
├── styles
├── utils
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Capturas de pantalla

## Inicio

> Agregar captura

---

## Pokédex

> Agregar captura

---

## Detalle del Pokémon

> Agregar captura

---

## Favoritos

> Agregar captura

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/pokelandia.git
```

Entrar al proyecto

```bash
cd pokelandia
```

Instalar dependencias

```bash
npm install
```

Crear el archivo de variables de entorno

```env
VITE_CONTACT_EMAIL=tu@email.com
```

Iniciar el servidor de desarrollo

```bash
npm run dev
```

---

# Compilar para producción

```bash
npm run build
```

Visualizar la versión de producción

```bash
npm run preview
```

---

# Variables de entorno

```env
VITE_CONTACT_EMAIL=tu@email.com
```

Este correo es utilizado por el formulario de contacto mediante FormSubmit.

---

# Páginas disponibles

| Ruta | Descripción |
|------|-------------|
| / | Inicio |
| /list-pokemon | Pokédex |
| /pokemon-tipos | Pokémon por tipo |
| /pokemon/:id | Detalle del Pokémon |
| /favoritos | Favoritos |
| /about | Acerca del proyecto |
| /contact | Contacto |

---

# Componentes principales

- Header
- Footer
- Searcher
- PokemonCard
- FavoriteButton
- TypeBadge
- Loader
- Toast
- SortControls
- ScrollToTop

---

# API

Este proyecto utiliza la API pública:

https://pokeapi.co/

---

# Rendimiento

- Peticiones bajo demanda
- Caché de solicitudes
- Imágenes responsive
- Componentes reutilizables
- Variables CSS optimizadas
- Animaciones modernas

---

# Accesibilidad

- HTML semántico
- Navegación mediante teclado
- Botones accesibles
- Etiquetas correctamente asociadas
- Tipografía responsive
- Estados de foco
- Compatible con lectores de pantalla

---

# Mejoras futuras

- Mejor paginación
- Más regiones Pokémon
- Filtros avanzados
- Búsqueda avanzada
- Comparador de Pokémon
- Cadenas evolutivas
- Soporte offline

---

# Licencia

Este proyecto fue desarrollado con fines educativos y para formar parte de un portfolio personal.

Pokémon, sus nombres, imágenes y todo el contenido relacionado pertenecen a Nintendo, Game Freak y The Pokémon Company.

---

# Autor

**Julián Haza**

GitHub

https://github.com/hazajulian

---

Desarrollado con ❤️ utilizando React y PokéAPI.