import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { Store } from "../store/Store";

import CategoryItem from "./CategoryItem";

const SubcategoryList: React.FC = observer(() => {
  const { categoryId } = useParams();
  if (categoryId) {
    let category = Store.categories.find((cat) => cat.id === +categoryId);
    if (category) {
      return (
        <section>
          <h1>{category.name}</h1>
          <ul>
            {Store.subcategories
              .filter((subcat) => subcat.categoryId === category?.id)
              .map((subcat) => {
                return (
                  <li key={subcat.id}>
                    <CategoryItem category={subcat} />
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
