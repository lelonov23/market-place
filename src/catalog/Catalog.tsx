import React from "react";

import { Store } from "../store/Store";

import CategoryContent from "./CategoryContent";

import styles from "./Catalog.module.css";

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<number | null>(
    null
  );

  const handleOpenCategory = (id: number) => {
    setActiveCategory(id);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.catList}>
        <h2>Каталог</h2>
        <ul className={styles.cats}>
          {Store.mainCategories.map((category) => {
            return (
              <li
                key={category.id}
                onClick={() => handleOpenCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? `${styles.active} ${styles.categoryLink}`
                    : styles.categoryLink
                }
              >
                <p>{category.name}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.subcatList}>
        <h2>
          {
            Store.mainCategories.find(
              (category) => category.id === activeCategory
            )?.name
          }
        </h2>
        <ul>
          {Store.mainCategories.map((category) => {
            return (
              <CategoryContent activeCategory={activeCategory} id={category.id}>
                <ul className={styles.subcats}>
                  {Store.subcategories
                    .filter((subcat) => subcat.categoryId === category?.id)
                    .map((subcat) => {
                      return (
                        <li key={subcat.id}>
                          <p className={styles.subcatHeading}>{subcat.name}</p>
                          <ul>
                            {Store.subcategories
                              .filter((cat) => cat.categoryId === subcat.id)
                              .map((cat) => {
                                return (
                                  <li>
                                    <p>{cat.name}</p>
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                      );
                    })}
                </ul>
              </CategoryContent>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Catalog;
