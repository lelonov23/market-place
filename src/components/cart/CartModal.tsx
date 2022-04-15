import React from "react";
import { observer } from "mobx-react";

import Portal from "../UI/Portal";

import styles from "./CartModal.module.css";

interface CartModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CartModal: React.FC<CartModalProps> = observer(
  ({ children, isOpen, handleClose }) => {
    if (!isOpen) return null;

    return (
      <Portal wrapperId="modal-container">
        <div onClick={handleClose} className={styles.modal}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles["modal-content"]}
          >
            {children}
          </div>
        </div>
      </Portal>
    );
  }
);

export default CartModal;
