import { createRoot } from "react-dom/client";
import "../styles/app.css";
import { StrictMode } from "react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import TrustList from "./pages/TrustList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="trustlist" element={<TrustList />} />
      </Routes>
    </Router>
  </StrictMode>
);
