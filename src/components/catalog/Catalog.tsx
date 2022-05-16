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
  const [activeCategory, setActiveCategory] = React.useState<
    number | string | null
  >(null);

  const handleOpenCategory = (_id: number | string) => {
    setActiveCategory(_id);
  };

  const handleOpenCategoryPage = (catId: number | string) => {
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
                key={category._id}
                onMouseEnter={() => handleOpenCategory(category._id)}
                onClick={() => handleOpenCategoryPage(category._id)}
                className={
                  activeCategory === category._id
                    ? `${styles.active} ${styles.categoryLink}`
                    : styles.categoryLink
                }
              >
                <p>
                  {category.name}
                  {activeCategory === category._id ? (
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
              (category) => category._id === activeCategory
            )?.name
          }
        </h2>
        <ul>
          {Store.mainCategories.map((category) => {
            return (
              <CategoryContent
                key={category._id}
                activeCategory={activeCategory}
                id={category._id}
              >
                <ul className={styles.subcats}>
                  {Store.subcategories
                    .filter((subcat) => subcat.categoryId === category?._id)
                    .map((subcat) => {
                      return (
                        <li key={subcat._id}>
                          <Link
                            onClick={handleClose}
                            to={`/products/${subcat._id}`}
                          >
                            <p className={styles.subcatHeading}>
                              {subcat.name}
                            </p>
                          </Link>
                          <ul>
                            {subcat.filters?.length &&
                              subcat.filters.map((filter) => {
                                return (
                                  <li key={filter._id}>
                                    <Link
                                      onClick={handleClose}
                                      to={`/products/${subcat._id}/${filter._id}`}
                                    >
                                      <p className={styles.filterHeading}>
                                        {filter.name}
                                      </p>
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
