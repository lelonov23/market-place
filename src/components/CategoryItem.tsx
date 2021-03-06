import React from "react";
import { Category } from "../store/Store";
import { observer } from "mobx-react";
import { Card } from "react-bootstrap";
import styles from "./CategoryItem.module.css";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = observer(({ category }) => {
  return (
    <Card className={styles.category}>
      <img src={category.img} />
      <h2 className={styles.categoryName}>{category.name}</h2>
    </Card>
  );
});

export default CategoryItem;
