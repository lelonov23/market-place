import { observer } from "mobx-react";
import React from "react";

import { CartStore } from "../../store/CartStore";
import OrderItem from "./OrderItem";

const Orders: React.FC = observer(() => {
  return (
    <div>
      {CartStore.orders.length > 0 && (
        <ul>
          {CartStore.orders.map((order) => {
            return (
              <li key={order.id}>
                <OrderItem order={order} />
              </li>
            );
          })}
        </ul>
      )}
      {CartStore.orders.length === 0 && <p>Пока нет активных заказов</p>}
    </div>
  );
});

export default Orders;
