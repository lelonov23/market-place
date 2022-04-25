import { observer } from "mobx-react";
import React from "react";

import { CartStore } from "../../store/CartStore";
import OrderItem from "./OrderItem";

const Orders: React.FC = observer(() => {
  return (
    <div>
      <ul>
        {CartStore.orders.map((order) => {
          return (
            <li key={order.id}>
              <OrderItem order={order} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Orders;
