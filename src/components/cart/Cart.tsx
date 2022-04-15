import { observer } from "mobx-react";
import React from "react";
import { Button } from "react-bootstrap";
import { CartStore, Product } from "../../store/CartStore";

import styles from "./Cart.module.css";

const addItemHandler = (product: Product) => {
  CartStore.addExistingItem(product);
};

const removeItemHandler = (product: Product) => {
  CartStore.removeExistingItem(product);
};

const removeAllOfItemHandler = (product: Product) => {
  CartStore.removeAllOfItem(product);
};

const Cart: React.FC = observer(() => {
  const items = CartStore.items;
  if (items.length)
    return (
      <div>
        <h2>Корзина</h2>
        <ul>
          {items &&
            items.map((item) => {
              return (
                <li key={item.id} className={styles.item}>
                  <h3>{item.product.name}</h3>
                  <div className={styles.countControl}>
                    <Button onClick={() => removeItemHandler(item.product)}>
                      <i className="fa-solid fa-minus"></i>
                    </Button>
                    <span>{item.count}</span>
                    <Button onClick={() => addItemHandler(item.product)}>
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                    <Button
                      onClick={() => removeAllOfItemHandler(item.product)}
                      className={styles.delete}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </div>
                </li>
              );
            })}
        </ul>
        <h2>Итого: {CartStore.totalPrice}</h2>
      </div>
    );
  else
    return (
      <div>
        <h2>Корзина</h2>
        <p>Корзина пока пуста.</p>
      </div>
    );
});

export default Cart;
