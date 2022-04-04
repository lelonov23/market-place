import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import * as reactRedux from "react-redux";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <reactRedux.Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </reactRedux.Provider>
  </React.StrictMode>
);
