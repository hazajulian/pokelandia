// About.jsx
// Muestra información general sobre el proyecto Pokelandia.

import {
  FaCode,
  FaGamepad,
  FaGithub,
  FaGlobeAmericas,
  FaReact,
} from "react-icons/fa";

import {
  SiCss3,
  SiVite,
} from "react-icons/si";

import "./About.css";

export function About() {
  return (
    <main className="about page">
      <div className="about__container container">
        <header className="about__header animate-fade-in-up">
          <span className="about__eyebrow">
            <FaGamepad aria-hidden="true" />
            Acerca del proyecto
          </span>

          <h1 className="page__title">
            Bienvenido a Pokelandia
          </h1>

          <p className="page__description">
            Pokelandia es una Pokédex moderna desarrollada para
            practicar desarrollo Frontend utilizando React,
            consumo de APIs y componentes reutilizables.
            El objetivo del proyecto fue crear una aplicación
            rápida, visualmente atractiva y fácil de utilizar,
            manteniendo una arquitectura limpia y escalable.
          </p>
        </header>

        <section className="about__hero surface">
          <div className="about__heroContent">
            <h2>
              Una Pokédex moderna
            </h2>

            <p>
              La aplicación consume información directamente
              desde la PokéAPI y organiza los datos en una
              interfaz intuitiva que permite explorar cientos
              de Pokémon, conocer sus estadísticas,
              habilidades, tipos y mucho más.
            </p>

            <p>
              Además del consumo de la API, el proyecto fue
              refactorizado utilizando una estructura moderna
              basada en componentes reutilizables, variables
              globales, sistema de temas y una organización
              mucho más profesional.
            </p>
          </div>

          <div className="about__heroBadge">
            <FaGamepad />

            <strong>
              React + PokéAPI
            </strong>

            <span>
              Proyecto Frontend
            </span>
          </div>
        </section>

        <section className="about__grid">
          <article className="about__card card">
            <FaReact className="about__icon" />

            <h3>
              React
            </h3>

            <p>
              Componentes reutilizables,
              estados, hooks y navegación
              mediante React Router.
            </p>
          </article>

          <article className="about__card card">
            <FaGlobeAmericas className="about__icon" />

            <h3>
              PokéAPI
            </h3>

            <p>
              Toda la información de los
              Pokémon se obtiene mediante
              la API pública oficial.
            </p>
          </article>

          <article className="about__card card">
            <SiCss3 className="about__icon" />

            <h3>
              CSS Moderno
            </h3>

            <p>
              Variables globales,
              componentes reutilizables,
              animaciones y diseño
              responsive.
            </p>
          </article>

          <article className="about__card card">
            <SiVite className="about__icon" />

            <h3>
              Vite
            </h3>

            <p>
              Entorno moderno para un
              desarrollo rápido y una
              compilación optimizada.
            </p>
          </article>
        </section>

        <section className="about__timeline surface">
          <h2>
            ¿Qué encontrarás?
          </h2>

          <div className="about__features">
            <article>
              <strong>
                Pokédex completa
              </strong>

              <p>
                Explora todos los Pokémon disponibles,
                consulta estadísticas, habilidades,
                movimientos y mucho más.
              </p>
            </article>

            <article>
              <strong>
                Búsqueda rápida
              </strong>

              <p>
                Encuentra cualquier Pokémon por nombre
                o número de forma inmediata.
              </p>
            </article>

            <article>
              <strong>
                Filtros por tipo
              </strong>

              <p>
                Navega entre los diferentes tipos
                para descubrir nuevos Pokémon.
              </p>
            </article>

            <article>
              <strong>
                Favoritos
              </strong>

              <p>
                Guarda tus Pokémon preferidos para
                acceder rápidamente a ellos.
              </p>
            </article>
          </div>
        </section>

        <section className="about__author surface">
          <div>
            <span className="about__authorTitle">
              <FaCode />
              Desarrollador
            </span>

            <h2>
              Julián Haza
            </h2>

            <p>
              Proyecto realizado como parte de un
              portfolio personal orientado al
              desarrollo web Frontend, con foco en
              buenas prácticas, organización del
              código y experiencia de usuario.
            </p>
          </div>

          <a
            className="button button--primary"
            href="https://github.com/TU-USUARIO"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            Ver GitHub
          </a>
        </section>
      </div>
    </main>
  );
}