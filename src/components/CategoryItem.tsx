import React from "react";
import { Category } from "../store/Store";
import { observer } from "mobx-react";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = observer(({ category }) => {
  return (
    <div>
      <button>
        <h2>{category.name}</h2>
      </button>
    </div>
  );
});

export default CategoryItem;