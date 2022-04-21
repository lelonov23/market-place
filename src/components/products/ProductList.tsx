import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { Store, Product } from "../../store/Store";

import ProductItem from "./ProductItem";

import styles from "./ProductList.module.css";
import Filter from "../filter/Filter";

const ProductList: React.FC = observer(() => {
  const { categoryId } = useParams();

  const products = Store.currentProducts;

  if (categoryId) {
    React.useEffect(() => {
      const type = Store.categories.find((cat) => cat.id === +categoryId)?.type;
      if (type) Store.filterProducts(type);
    }, [categoryId]);

    const subcategory = Store.subcategories.find((c) => c.id === +categoryId);
    return (
      <section>
        <h1>
          {subcategory?.name}
          <span className={styles.count}> {products.length} товаров</span>
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
          <Filter></Filter>
        </div>
      </section>
    );
  } else return null;
});

export default ProductList;
