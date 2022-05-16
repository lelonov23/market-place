import React from "react";
import { observer } from "mobx-react";

import { Store, Product } from "../../store/Store";

import styles from "./ProductParameters.module.css";

interface ProductParametersProps {
  product: Product;
}

const ProductParameters: React.FC<ProductParametersProps> = observer(
  ({ product }) => {
    const params = Store.params.find(
      (param) => param.productId === product._id
    );
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

            {params.type === "laptop" && (
              <>
                <li>{"Тип устройства: " + params.laptopType}</li>
                <li>{"Диагональ экрана: " + params.screenSize}</li>
                <li>{"Процессор: " + params.processor}</li>
              </>
            )}

            {params.type === "pc" && (
              <>
                <li>{"Процессор: " + params.processor}</li>
                <li>{"Видеокарта: " + params.graphics}</li>
                <li>{"Операционная система: " + params.os}</li>
              </>
            )}

            {params.type === "monitor" && (
              <>
                <li>{"Разрешение экрана: " + params.resolution}</li>
                <li>{"Диагональ экрана: " + params.screenSize}</li>
                <li>{"Тип матрицы: " + params.matrix}</li>
              </>
            )}
          </ul>
        </section>
      );
    } else return null;
  }
);

export default ProductParameters;
