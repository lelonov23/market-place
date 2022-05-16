import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartStore } from "../../store/CartStore";

import { Product, Store } from "../../store/Store";

import styles from "./ProductItem.module.css";
import ProductParameters from "./ProductParameters";
import { observer } from "mobx-react";
import { Context } from "../../App";

interface ProductItemProps {
  product: Product;
}

const addToCartHandle = (
  product: Product,
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (CartStore.items.find((item) => item.product._id === product._id))
    CartStore.addExistingItem(product);
  else CartStore.addNewItem(product);
  const stock = Store.getItemStock(product._id);
  if (stock > 0) setCartIsOpen(true);
};

const ProductItem: React.FC<ProductItemProps> = observer(({ product }) => {
  const { setCartIsOpen } = React.useContext(Context);
  return (
    <Card className={styles.productCard}>
      <div className={styles.info}>
        <img src={product.img} alt="phone_img" />
        <div className={styles.desc}>
          <h3>{product.name}</h3>
          <ProductParameters product={product} />
        </div>
      </div>
      <div className={styles.orderControl}>
        <Button
          disabled={Store.getItemStock(product._id) === 0}
          onClick={() => addToCartHandle(product, setCartIsOpen)}
        >
          {Store.getItemStock(product._id) === 0
            ? "Нет в наличии"
            : "В корзину"}
        </Button>
        <span className={styles.price}>{product.cost}р.</span>
      </div>
    </Card>
  );
});

export default ProductItem;
