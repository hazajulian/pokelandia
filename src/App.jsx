// App.jsx
// Organiza las rutas principales y los elementos globales de la aplicación.

import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ScrollToRoute } from "./components/ScrollToTop/ScrollToRoute";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Searcher } from "./components/Searcher/Searcher";

import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Favorites } from "./pages/Favorites/Favorites";
import { Home } from "./pages/Home/Home";
import { PokemonDetail } from "./pages/PokemonDetail/PokemonDetail";
import { PokemonList } from "./pages/PokemonList/PokemonList";
import { PokemonTypes } from "./pages/PokemonTypes/PokemonTypes";

function App() {
  const location = useLocation();

  const showSearcher =
    location.pathname === "/list-pokemon" ||
    location.pathname === "/pokemon-tipos";

  return (
    <div className="app">
      <ScrollToRoute />

      <Header />

      {showSearcher && <Searcher />}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/list-pokemon"
          element={<PokemonList />}
        />

        <Route
          path="/pokemon-tipos"
          element={<PokemonTypes />}
        />

        <Route
          path="/pokemon/:id"
          element={<PokemonDetail />}
        />

        <Route
          path="/favoritos"
          element={<Favorites />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;