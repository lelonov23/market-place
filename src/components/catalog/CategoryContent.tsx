import React from "react";

interface CategoryContentProps {
  activeCategory: number | null;
  id: number;
}

const CategoryContent: React.FC<CategoryContentProps> = ({
  id,
  activeCategory,
  children,
}) => {
  return activeCategory === id ? <div>{children}</div> : null;
};

export default CategoryContent;
