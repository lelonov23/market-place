import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { Store } from "./Store";

import Header from "./components/layout/Header";
import HomePage from "./components/routes/HomePage";

import categories from "./content.json";
import products from "./items.json";

const App: React.FC = observer(() => {
  React.useEffect(() => {
    Store.setCategories(categories);
    Store.setProducts(products);
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
});

export default App;
