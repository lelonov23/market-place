import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { Store } from "../../store/Store";
import CategoryItem from "../CategoryItem";

import styles from "./HomePage.module.css";

const HomePage: React.FC = observer(() => {
  return (
    <section>
      <h1>Популярные категории</h1>
      <ul className={styles.categoryList}>
        {Store.mainCategories.map((category) => {
          return (
            <li className={styles.categoryItem} key={category.id}>
              <Link to={`/category/${category.id}`}>
                <CategoryItem category={category} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
});

export default HomePage;
