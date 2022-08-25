import { createRoot } from "react-dom/client";
import "../styles/app.css";
import { StrictMode } from "react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import TrustList from "./pages/TrustList";
import History from "./pages/History";
import MenuNav from "./components/MenuNav";
import HistoricalReport from "./pages/HistoricalReport";
import { WindowRef } from "../constants/Types";

createRoot(document.getElementById(WindowRef.root)!).render(
  <StrictMode>
    <Router>
      <MenuNav />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="trustlist" element={<TrustList />} />
        <Route path="history" element={<History />} />
        <Route path="report" element={<HistoricalReport />} />
      </Routes>
    </Router>
  </StrictMode>
);
