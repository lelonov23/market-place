import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { Store } from "./store/Store";

import Header from "./components/layout/Header";
import HomePage from "./components/routes/HomePage";
import SubcategoryList from "./components/SubcategoryList";
import ProductList from "./components/products/ProductList";

import categories from "./content.json";
import products from "./items.json";
import params from "./params.json";

import { Container } from "react-bootstrap";

const App: React.FC = observer(() => {
  React.useEffect(() => {
    Store.setCategories(categories);
    Store.setProducts(products);
    Store.setParams(params);
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<SubcategoryList />} />
          <Route path="/products/:categoryId" element={<ProductList />} />
        </Routes>
      </Container>
    </div>
  );
});

export default App;
