import Navegation from "./components/Navegation";
import PasoAPaso from "./pages/PasoaPaso";
import Noticias from "./pages/Noticias";
import Problemas from "./pages/Problemas";
import Inicio from "./pages/Inicio";
import { Routes, Route } from "react-router-dom";
import SocialFloat from "./components/SocialFloat";
import SearchPage from "./components/Search";

function App() {
  return (
    <div>
      <Navegation />

      <main>

        <Routes>
          <Route path="/paso-a-paso/:id?" element={<PasoAPaso />} />
          <Route path="/noticias/:id?" element={<Noticias />} />
          <Route path="/resolucion-a-problemas/:id?" element={<Problemas />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/buscar" element={<SearchPage />} />
        </Routes>
        <SocialFloat />
      </main>
    </div>
  );
}

export default App;
