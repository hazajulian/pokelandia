// HomeBenefits.jsx
// Sección que muestra las ventajas principales de PokéLandia.

import { HOME_BENEFITS } from "../data/homeData";

import "./HomeBenefits.css";

export function HomeBenefits() {
  return (
    <section className="homeBenefits section">
      <div className="container">
        <header className="section__header homeBenefits__header">
          <span className="home__eyebrow">
            Simple y accesible
          </span>

          <h2 className="section__title">
            Encuentra lo que buscas fácilmente
          </h2>

          <p className="section__subtitle">
            PokéLandia está pensada para consultar información sin
            pasos complicados y desde cualquier dispositivo.
          </p>
        </header>

        <div className="homeBenefits__grid">
          {HOME_BENEFITS.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.id}
                className="homeBenefitCard card"
              >
                <div className="homeBenefitCard__icon">
                  <Icon aria-hidden="true" />
                </div>

                <div className="homeBenefitCard__content">
                  <h3>{benefit.title}</h3>

                  <p>{benefit.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}