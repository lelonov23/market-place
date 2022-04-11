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
      <ul className={styles.cats}>
        {Store.mainCategories.map((category) => {
          return (
            <li
              key={category.id}
              onClick={() => handleOpenCategory(category.id)}
              className={activeCategory === category.id ? styles.active : ""}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
      <div className="outlet">
        {Store.mainCategories.map((category) => {
          return (
            <CategoryContent activeCategory={activeCategory} id={category.id}>
              {Store.subcategories
                .filter((subcat) => subcat.categoryId === category?.id)
                .map((subcat) => {
                  return (
                    <div key={subcat.id}>
                      <p>{subcat.name}</p>
                    </div>
                  );
                })}
            </CategoryContent>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
