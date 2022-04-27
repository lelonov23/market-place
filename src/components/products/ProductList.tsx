import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { Store } from "../../store/Store";

import ProductItem from "./ProductItem";

import styles from "./ProductList.module.css";
import Filter from "../filter/Filter";

const ProductList: React.FC = observer(() => {
  const { categoryId, filterId } = useParams();

  // store observables init
  const products = Store.currentProducts;
  const cat =
    categoryId && Store.subcategories.find((cat) => cat.id === +categoryId);
  const type = cat !== "" && cat?.type;

  // preset filter init
  const filter =
    categoryId &&
    filterId &&
    Store.subcategories
      .find((cat) => cat.id === +categoryId)
      ?.filters?.find((filter) => filter.id === +filterId);

  if (categoryId && products && type) {
    // category filter apply
    React.useEffect(() => {
      const type = Store.categories.find((cat) => cat.id === +categoryId)?.type;
      if (type) Store.filterProducts(type);
    }, [categoryId, filterId]);

    // preset filter apply
    React.useEffect(() => {
      if (categoryId && filterId) {
        if (filter !== "" && filter?.filters && type) {
          Store.filterByPresetData(type, filter);
        }
      }
    }, [filterId]);

    const subcategory = Store.subcategories.find((c) => c.id === +categoryId);
    return (
      <section>
        <h1>
          {!filterId && subcategory?.name}
          {filterId && filter !== "" && filter?.name}
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
          {/* <div>
            <div>
              <span>{filterId && filter !== "" && filter?.name}</span>
            </div> */}
          <Filter type={type}></Filter>
          {/* </div> */}
        </div>
      </section>
    );
  } else return null;
});

export default ProductList;
