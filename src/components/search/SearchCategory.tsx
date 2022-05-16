import { observer } from "mobx-react";
import React from "react";
import { Product, Store } from "../../store/Store";
import SearchProduct from "./SearchProduct";

import styles from "./SearchCategory.module.css";
import { Link } from "react-router-dom";

interface SearchCategoryProps {
  cat: Product[];
  query: string;
}

const SearchCategory: React.FC<SearchCategoryProps> = observer(
  ({ cat, query }) => {
    const catName = Store.subcategories.find(
      (category) => cat[0].categoryId === category._id
    )?.name;

    return (
      <div className={styles.cat}>
        <h2>{catName ? `${catName} ${query}` : query}</h2>
        <ul className={styles.prodList}>
          {cat.map((prod) => {
            return (
              <li className={styles.prod} key={prod._id}>
                <SearchProduct prod={prod} />
              </li>
            );
          })}
        </ul>
        <Link className={styles.link} to={`/products/${cat[0].categoryId}`}>
          Посмотреть все товары
        </Link>
      </div>
    );
  }
);

export default SearchCategory;
