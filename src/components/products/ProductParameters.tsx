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
              <>
                <li>{"Операционная система: " + params.os}</li>
                <li>{"Разрешение экрана: " + params.resolution}</li>
                <li>{"Батарея: " + params.battery}</li>
              </>
            )}

            {params.type === "tablet" && (
              <>
                <li>{"Дисплей: " + params.display}</li>
                <li>{"Процессор: " + params.processor}</li>
                <li>{"Батарея: " + params.battery}</li>
              </>
            )}

            {params.type === "charger" && (
              <>
                <li>{"Тип устройства: " + params.chargerType}</li>
                <li>{"Бренд: " + params.brand}</li>

                <li>{"Разъём: " + params.port}</li>
              </>
            )}
          </ul>
        </section>
      );
    } else return null;
  }
);

export default ProductParameters;
