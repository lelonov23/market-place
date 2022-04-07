import React from "react";
import { observer } from "mobx-react";

import { CategoryStoreImpl } from "../../CategoryStore";

interface HomePageProps {
  categoryStore: CategoryStoreImpl;
}

const HomePage: React.FC<HomePageProps> = observer(({ categoryStore }) => {
  console.log("stoer--- ", categoryStore.categories);
  return (
    <div>
      <ul>
        {categoryStore.categories.map((category) => {
          return (
            <li>
              <p>{category.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default HomePage;
