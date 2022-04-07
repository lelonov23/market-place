import React from "react";
import { observer } from "mobx-react";

import { CategoryStoreImpl } from "../../CategoryStore";

interface HomePageProps {
  categoryStore: CategoryStoreImpl;
}

const HomePage: React.FC<HomePageProps> = observer(({ categoryStore }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {categoryStore.categories.map((category) => {
          return (
            <li key={category.id}>
              <h2>{category.name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default HomePage;
