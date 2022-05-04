import React from "react";
import { Button } from "react-bootstrap";
import { CartStore, OrderData } from "../../store/CartStore";
import styles from "./OrderForm.module.css";

interface OrderFormProps {
  setActive: React.Dispatch<React.SetStateAction<"cart" | "orders">>;
  setIsOrderForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderForm: React.FC<OrderFormProps> = ({ setActive, setIsOrderForm }) => {
  const [orderData, setOrderData] = React.useState<OrderData>({
    name: "",
    lastname: "",
    phone: "",
    "backup-phone": "",
    city: "",
    street: "",
  });

  const orderHandler = () => {
    if (
      orderData.name &&
      orderData.lastname &&
      orderData.phone &&
      orderData.city &&
      orderData.street
    ) {
      CartStore.confirmOrder(orderData);
      setActive("orders");
      setIsOrderForm(false);
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.formControl}>
        <div className={styles.control}>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            onChange={(e) =>
              setOrderData({ ...orderData, name: e.target.value })
            }
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="lastname">Фамилия</label>
          <input
            type="text"
            id="lastname"
            onChange={(e) =>
              setOrderData({ ...orderData, lastname: e.target.value })
            }
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="text"
            id="phone"
            onChange={(e) =>
              setOrderData({ ...orderData, phone: e.target.value })
            }
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="backup-phone">Телефон, если не дозвонимся</label>
          <input
            type="text"
            id="backup-phone"
            onChange={(e) =>
              setOrderData({ ...orderData, "backup-phone": e.target.value })
            }
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="city">Город</label>
          <input
            type="text"
            id="city"
            onChange={(e) =>
              setOrderData({ ...orderData, city: e.target.value })
            }
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="street">Улица</label>
          <input
            type="text"
            id="street"
            onChange={(e) =>
              setOrderData({ ...orderData, street: e.target.value })
            }
          />
        </div>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          orderHandler();
        }}
      >
        Оформить заказ
      </Button>
    </form>
  );
};

export default OrderForm;
