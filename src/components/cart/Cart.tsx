import { observer } from "mobx-react";
import React from "react";
import { Button } from "react-bootstrap";
import { CartStore, Product } from "../../store/CartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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

const orderHandler = () => {
  CartStore.confirmOrder();
};

const Cart: React.FC = observer(() => {
  const items = CartStore.items;
  // if (items.length)
  return (
    <div>
      <h2>Корзина</h2>
      {items.length > 0 && (
        <ul>
          {items &&
            items.map((item) => {
              return (
                <li key={item.id} className={styles.item}>
                  <h3>{item.product.name}</h3>
                  <div className={styles.countControl}>
                    <Button onClick={() => removeItemHandler(item.product)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <span>{item.count}</span>
                    <Button onClick={() => addItemHandler(item.product)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                      onClick={() => removeAllOfItemHandler(item.product)}
                      className={styles.delete}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      {items.length > 0 && (
        <div className={styles.orderControl}>
          <h2>Итого: {CartStore.totalPrice}</h2>
          <Button onClick={orderHandler}>Сделать заказ</Button>
        </div>
      )}
      {items.length == 0 && <p>Корзина пока пуста.</p>}
    </div>
  );
});

export default Cart;
