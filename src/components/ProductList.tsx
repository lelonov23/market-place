import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

// interface ProductListProps {}

const ProductList: React.FC = observer(() => {
  const { categoryId } = useParams();
  return <section></section>;
});

export default ProductList;
