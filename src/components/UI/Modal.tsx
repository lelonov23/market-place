import React from "react";
import { observer } from "mobx-react";

import Portal from "./Portal";

import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal: React.FC<ModalProps> = observer(
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
            <button className={styles.close} onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </Portal>
    );
  }
);
export default Modal;
