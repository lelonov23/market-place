import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { Store } from "../store/Store";

import ProductIrem from "./ProductItem";

// interface ProductListProps {}

const ProductList: React.FC = observer(() => {
  const { categoryId } = useParams();
  if (categoryId)
    return (
      <section>
        <ul>
          {Store.products
            .filter((product) => product.categoryId === +categoryId)
            .map((product) => {
              return (
                <li key={product.id}>
                  <p>{product.name}</p>
                </li>
              );
            })}
        </ul>
      </section>
    );
  else return null;
});

export default ProductList;
