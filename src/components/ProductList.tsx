import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { Store } from "../store/Store";

import ProductItem from "./ProductItem";

import styles from "./ProductList.module.css";

const ProductList: React.FC = observer(() => {
  const { categoryId } = useParams();

  if (categoryId) {
    const products = Store.products.filter(
      (product) => product.categoryId === +categoryId
    );

    const subcategory = Store.subcategories.find((c) => c.id === +categoryId);
    return (
      <section>
        <h1>
          {subcategory?.name}{" "}
          <span className={styles.count}>{products.length} товаров</span>
        </h1>
        <div className={styles.content}>
          <ul className={styles.list}>
            {products.map((product) => {
              return (
                <li className={styles.product} key={product.id}>
                  <ProductItem product={product} />
                </li>
              );
            })}
          </ul>
          <div>filters placeholder</div>
        </div>
      </section>
    );
  } else return null;
});

export default ProductList;
