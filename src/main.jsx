import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import LMSState from "./Context/LMSState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LMSState>
      <Router>
        <App />
      </Router>
    </LMSState>
  </StrictMode>
);
