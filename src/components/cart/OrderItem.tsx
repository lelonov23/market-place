import { observer } from "mobx-react";
import React from "react";
import { Order } from "../../store/CartStore";

import styles from "./OrderItem.module.css";

interface OrderProps {
  order: Order;
}

const OrderItem: React.FC<OrderProps> = observer(({ order }) => {
  return (
    <div className={styles.order}>
      <h3>{order.id}</h3>
      <p>{order.name}</p>
      <ul>
        {order.items.map((item) => {
          return (
            <li key={item.id}>
              <h4>{item.product.name}</h4>
              <span>Кол-во: {item.count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default OrderItem;
