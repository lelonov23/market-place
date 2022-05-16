import React from "react";
import { observer } from "mobx-react";
import { useParams, Link } from "react-router-dom";

import { Store } from "../store/Store";

import CategoryItem from "./CategoryItem";

import styles from "./SubcategoryList.module.css";

const SubcategoryList: React.FC = observer(() => {
  const { categoryId } = useParams();
  if (categoryId) {
    const category = Store.categories.find((cat) => cat._id === categoryId);
    if (category) {
      return (
        <section>
          <h1>{category.name}</h1>
          <ul className={styles.list}>
            {Store.subcategories
              .filter((subcat) => subcat.categoryId === category?._id)
              .map((subcat) => {
                return (
                  <li className={styles.subcat} key={subcat._id}>
                    <Link to={`/products/${subcat._id}`}>
                      <CategoryItem category={subcat} />
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>
      );
    } else
      return (
        <section>
          <h1>Категория не найдена</h1>
          <p>Возможно, данные были перемещены.</p>
        </section>
      );
  } else
    return (
      <section>
        <h1>Категория не найдена</h1>
        <p>Возможно, данные были перемещены.</p>
      </section>
    );
});

export default SubcategoryList;
