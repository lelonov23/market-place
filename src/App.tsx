import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { CategoryStoreImpl } from "./CategoryStore";

import Header from "./components/layout/Header";
import HomePage from "./components/routes/HomePage";

import categories from "./content.json";

interface AppProps {
  categoryStore: CategoryStoreImpl;
}

const App: React.FC<AppProps> = observer(({ categoryStore }) => {
  React.useEffect(() => {
    categoryStore.setCategories(categories);
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage categoryStore={categoryStore} />} />
      </Routes>
    </div>
  );
});

export default App;
