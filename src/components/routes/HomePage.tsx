import React from "react";
import { observer } from "mobx-react";

import { Store } from "../../store/Store";
import CategoryItem from "../CategoryItem";

import styles from "./HomePage.module.css";

const HomePage: React.FC = observer(() => {
  return (
    <div>
      <h1>Популярные категории</h1>
      <ul className={styles.categoryList}>
        {Store.mainCategories.map((category) => {
          return (
            <li className={styles.categoryItem} key={category.id}>
              <CategoryItem category={category} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default HomePage;
