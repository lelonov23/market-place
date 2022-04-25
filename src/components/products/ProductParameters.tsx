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
      return (
        <section className={styles.paramList}>
          <h2>Параметры</h2>
          <ul>
            {params.type === "phone" && (
              <li>{"Операционная система: " + params.os}</li>
            )}
            {params.type === "phone" && (
              <li>{"Разрешение экрана: " + params.resolution}</li>
            )}
            {params.type === "tablet" && (
              <li>{"Дисплей: " + params.display}</li>
            )}
            {params.type === "tablet" && (
              <li>{"Процессор: " + params.processor}</li>
            )}
            {params.type === "tablet" ||
              ("phone" && <li>{"Батарея: " + params.battery}</li>)}
          </ul>
        </section>
      );
    } else return null;
  }
);

export default ProductParameters;
