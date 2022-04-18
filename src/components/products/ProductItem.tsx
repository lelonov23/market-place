import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartStore } from "../../store/CartStore";

import { Product } from "../../store/Store";

import styles from "./ProductItem.module.css";
import ProductParameters from "./ProductParameters";
import CartModal from "../cart/CartModal";
import { observer } from "mobx-react";
import { Context } from "../../App";

interface ProductItemProps {
  product: Product;
}

const addToCartHandle = (
  product: Product,
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (CartStore.items.find((item) => item.product.id === product.id))
    CartStore.addExistingItem(product);
  else CartStore.addNewItem(product);
  setCartIsOpen(true);
};

const ProductItem: React.FC<ProductItemProps> = observer(({ product }) => {
  const { setCartIsOpen } = React.useContext(Context);
  const [isOpen, setIsOpen] = React.useState(false);
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
        <Button onClick={() => addToCartHandle(product, setCartIsOpen)}>
          В корзину
        </Button>
        <span className={styles.price}>{product.cost}р.</span>
      </div>
      <CartModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </Card>
  );
});

export default ProductItem;
