import React, { useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import cats from "./content.json";
import { useAppDispatch } from "./app/hooks";
import { load } from "./warehouseSlice";
import { Routes, Route } from "react-router-dom";

import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(load(cats));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
