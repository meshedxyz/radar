import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../styles/app.css";
import { WindowRef } from "../constants/Types";

createRoot(document.getElementById(WindowRef.root)!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
