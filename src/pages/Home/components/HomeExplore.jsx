// HomeExplore.jsx
// Sección que muestra las funciones principales de PokéLandia.

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import { HOME_FEATURES } from "../data/homeData";

import "./HomeExplore.css";

export function HomeExplore() {
  return (
    <section
      id="explorar"
      className="homeExplore section"
    >
      <div className="container">
        <header className="section__header homeExplore__header">
          <span className="home__eyebrow">
            Comienza tu aventura
          </span>

          <h2 className="section__title">
            Todo lo que puedes explorar
          </h2>

          <p className="section__subtitle">
            Accede rápidamente a las funciones principales de
            PokéLandia y conoce mejor el mundo Pokémon.
          </p>
        </header>

        <div className="homeExplore__grid">
          {HOME_FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                className="homeFeatureCard animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="homeFeatureCard__imageBox">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="homeFeatureCard__image"
                  />
                </div>

                <div className="homeFeatureCard__content">
                  <div className="homeFeatureCard__icon">
                    <Icon aria-hidden="true" />
                  </div>

                  <h3 className="homeFeatureCard__title">
                    {feature.title}
                  </h3>

                  <p className="homeFeatureCard__description">
                    {feature.description}
                  </p>

                  <Link
                    to={feature.link}
                    className="homeFeatureCard__link"
                  >
                    {feature.linkText}
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}