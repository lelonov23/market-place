import React from "react";
import { observer } from "mobx-react";

import { Store } from "../../store/Store";
import CategoryItem from "../CategoryItem";

const HomePage: React.FC = observer(() => {
  return (
    <div>
      <h1>Популярные категории</h1>
      <ul>
        {Store.mainCategories.map((category) => {
          return (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default HomePage;
