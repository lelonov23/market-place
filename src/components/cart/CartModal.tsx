import React from "react";
import { observer } from "mobx-react";

import Portal from "../UI/Portal";

import styles from "./CartModal.module.css";
import Cart from "./Cart";
import Orders from "./Orders";

interface CartModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CartModal: React.FC<CartModalProps> = observer(
  ({ isOpen, handleClose }) => {
    const [active, setActive] = React.useState<"cart" | "orders">("cart");

    React.useEffect(() => {
      setActive("cart");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <Portal wrapperId="modal-container">
        <div onClick={handleClose} className={styles.modal}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles["modal-content"]}
          >
            <div className={styles.tabs}>
              <h2
                className={`${styles.tab} ${
                  active === "cart" ? styles.active : null
                }`}
                onClick={() => setActive("cart")}
              >
                Корзина
              </h2>
              <h2
                className={`${styles.tab} ${
                  active === "orders" ? styles.active : null
                }`}
                onClick={() => setActive("orders")}
              >
                Заказы
              </h2>
            </div>
            {active === "cart" ? <Cart onOrder={setActive} /> : <Orders />}
            <button className={styles.close} onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </Portal>
    );
  }
);

export default CartModal;
