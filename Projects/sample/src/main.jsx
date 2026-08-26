import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ScrollTop from "./framework/ScrollTop";

import { BrowserRouter } from "react-router-dom";

// Legacy support: redirect old HashRouter URLs (sess.co.in/#/about)
// to their real-path equivalents (sess.co.in/about)
if (window.location.hash.startsWith("#/")) {
  window.location.replace(
    window.location.pathname.replace(/\/$/, "") + window.location.hash.slice(1)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <ScrollTop />
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
