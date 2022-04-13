import React from "react";
import { Card } from "react-bootstrap";

import { Product } from "../store/Store";

import styles from "./ProductItem.module.css";
import ProductParameters from "./ProductParameters";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card className={styles.productCard}>
      <img src={product.img} />
      <div className={styles.desc}>
        <h3>{product.name}</h3>
        <ProductParameters product={product} />
      </div>
    </Card>
  );
};

export default ProductItem;
