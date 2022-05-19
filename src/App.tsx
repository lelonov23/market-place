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

import categories from "./json/content.json";
import products from "./json/items.json";
import params from "./json/params.json";

import { Container } from "react-bootstrap";
import SearchPage from "./components/routes/SearchPage";

type ContextType = {
  cartIsOpen: boolean;
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Context = React.createContext<ContextType>({
  cartIsOpen: false,
  setCartIsOpen: () => {},
});

const App: React.FC = observer(() => {
  React.useEffect(() => {
    Store.setCategories();
    Store.setProducts();
    Store.setParams(params);
  }, []);

  const [cartIsOpen, setCartIsOpen] = React.useState<boolean>(false);

  return (
    <div className="App">
      <Context.Provider
        value={{
          cartIsOpen,
          setCartIsOpen,
        }}
      >
        <Header />
        {Store.isLoaded && (
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/category/:categoryId"
                element={<SubcategoryList />}
              />
              <Route
                path="/products/:categoryId/:filterId"
                element={<ProductList />}
              />
              <Route path="/products/:categoryId" element={<ProductList />} />
            </Routes>
          </Container>
        )}
      </Context.Provider>
    </div>
  );
});

export default App;
