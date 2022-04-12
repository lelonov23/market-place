import React from "react";
import { Card } from "react-bootstrap";

import { Product } from "../store/Store";

import styles from "./ProductItem.module.css";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card className={styles.productCard}>
      <img src={product.img} />
      <h3>{product.name}</h3>
    </Card>
  );
};

export default ProductItem;
