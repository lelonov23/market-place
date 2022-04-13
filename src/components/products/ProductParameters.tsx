import React from "react";
import { observer } from "mobx-react";

import { Store, Product } from "../../store/Store";

import styles from "./ProductParameters.module.css";

interface ProductParametersProps {
  product: Product;
}

const ProductParameters: React.FC<ProductParametersProps> = observer(
  ({ product }) => {
    const params = Store.params.find((param) => param.productId === product.id);
    if (params) {
      const keys = Object.keys(params).filter((key) => key !== "productId");
      return (
        <section className={styles.paramList}>
          <h2>Параметры</h2>
          <ul>
            {keys.map((key) => {
              return (
                <li>
                  <p>
                    {key}: {params[key]}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      );
    } else return null;
  }
);

export default ProductParameters;
