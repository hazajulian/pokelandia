// Home.jsx
// Landing principal de PokéLandia.

import { HomeHero } from "./components/HomeHero";
import { HomeExplore } from "./components/HomeExplore";
import { HomeBenefits } from "./components/HomeBenefits";
import { HomeAbout } from "./components/HomeAbout";
import { HomeCta } from "./components/HomeCta";

import "./Home.css";

export function Home() {
  return (
    <main className="home">
      <HomeHero />

      <HomeExplore />

      <HomeBenefits />

      <HomeAbout />

      <HomeCta />
    </main>
  );
}