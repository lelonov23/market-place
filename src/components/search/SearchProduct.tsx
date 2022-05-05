import React from "react";
import { Product } from "../../store/Store";

import styles from "./SearchProduct.module.css";

interface SearchProductProps {
  prod: Product;
}

const SearchProduct: React.FC<SearchProductProps> = ({ prod }) => {
  const handleCart = () => {};

  return (
    <div onClick={handleCart} className={styles.prod}>
      <img className={styles.img} src={prod.img} alt="img" />
      <p>{prod.name}</p>
      <span className={styles.cost}>{prod.cost}р.</span>
    </div>
  );
};

export default SearchProduct;
