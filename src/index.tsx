import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { CategoryStore } from "./CategoryStore";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <App categoryStore={CategoryStore} />
      </Router>
    </React.StrictMode>
  );
}
