import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import { Store } from "../../store/Store";

import CategoryContent from "./CategoryContent";

import styles from "./Catalog.module.css";

interface CatalogProps {
  handleClose: () => void;
}

const Catalog: React.FC<CatalogProps> = observer(({ handleClose }) => {
  const [activeCategory, setActiveCategory] = React.useState<number | null>(
    null
  );

  const handleOpenCategory = (id: number) => {
    setActiveCategory(id);
  };

  const handleOpenCategoryPage = (catId: number) => {
    navigate(`/category/${catId}`);
    handleClose();
  };

  const navigate = useNavigate();

  return (
    <div className={styles.tabs}>
      <div className={styles.catList}>
        <h2>Каталог</h2>
        <ul className={styles.cats}>
          {Store.mainCategories.map((category) => {
            return (
              <li
                key={category.id}
                onMouseEnter={() => handleOpenCategory(category.id)}
                onClick={() => handleOpenCategoryPage(category.id)}
                className={
                  activeCategory === category.id
                    ? `${styles.active} ${styles.categoryLink}`
                    : styles.categoryLink
                }
              >
                <p>
                  {category.name}
                  {activeCategory === category.id ? (
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  ) : (
                    ""
                  )}
                </p>
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
              <CategoryContent
                key={category.id}
                activeCategory={activeCategory}
                id={category.id}
              >
                <ul className={styles.subcats}>
                  {Store.subcategories
                    .filter((subcat) => subcat.categoryId === category?.id)
                    .map((subcat) => {
                      return (
                        <li key={subcat.id}>
                          <Link
                            onClick={handleClose}
                            to={`/products/${subcat.id}`}
                          >
                            <p className={styles.subcatHeading}>
                              {subcat.name}
                            </p>
                          </Link>
                          <ul>
                            {subcat.filters?.length &&
                              subcat.filters.map((filter) => {
                                return (
                                  <li key={filter.id}>
                                    <Link
                                      onClick={handleClose}
                                      to={`/products/${subcat.id}/${filter.id}`}
                                    >
                                      {filter.name}
                                    </Link>
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
});

export default Catalog;
