import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LeagueProvider } from "./hooks/use-league";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import HomePage from "./pages/HomePage";
import RatePage from "./pages/RatePage";

export default function App() {
  const location = useLocation();

  return (
    <LeagueProvider>
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/rate" element={<RatePage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </LeagueProvider>
  );
}
