import React from "react";
import { observer } from "mobx-react";

import { Store, Product, Param } from "../../store/Store";

import styles from "./ProductParameters.module.css";

interface ProductParametersProps {
  product: Product;
}

const ProductParameters: React.FC<ProductParametersProps> = observer(
  ({ product }) => {
    const params = Store.params.find((param) => param.productId === product.id);
    if (params) {
      // const keys = Object.keys(params).filter((key) => key !== "productId");
      if (params.type === "phone")
        return (
          <section className={styles.paramList}>
            <h2>Параметры</h2>
            <ul>
              <li>{"Дисплей: " + params.display}</li>
              <li>{"Операционная система: " + params.os}</li>
              <li>{"Батарея: " + params.battery}</li>
            </ul>
          </section>
        );
      else return null;
    } else return null;
  }
);

export default ProductParameters;
