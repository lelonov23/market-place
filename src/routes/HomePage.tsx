import React from "react";

import { useAppSelector } from "../app/hooks";
import { selectWarehouse } from "../warehouseSlice";

function HomePage() {
  const categories = useAppSelector(selectWarehouse);
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {categories.map((cat) => {
          return (
            <li>
              <h2>{cat.name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
