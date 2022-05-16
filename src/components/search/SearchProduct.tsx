import React from "react";
import { Button } from "react-bootstrap";
import { Product, Store } from "../../store/Store";
import { Context } from "../../App";

import styles from "./SearchProduct.module.css";
import { CartStore } from "../../store/CartStore";

interface SearchProductProps {
  prod: Product;
}

const addToCartHandle = (
  product: Product,
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (CartStore.items.find((item) => item.product._id === product._id))
    CartStore.addExistingItem(product);
  else CartStore.addNewItem(product);
  const stock = Store.getItemStock(product._id);
  if (stock > 0) setCartIsOpen(true);
};

const SearchProduct: React.FC<SearchProductProps> = ({ prod }) => {
  const { setCartIsOpen } = React.useContext(Context);

  return (
    <div className={styles.prod}>
      <img className={styles.img} src={prod.img} alt="img" />
      <div className={styles.info}>
        <p>{prod.name}</p>
        <div className={styles.controls}>
          <span className={styles.cost}>{prod.cost}р.</span>
          <Button
            disabled={Store.getItemStock(prod._id) === 0}
            onClick={() => addToCartHandle(prod, setCartIsOpen)}
          >
            {Store.getItemStock(prod._id) === 0 ? "Нет в наличии" : "В корзину"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
