import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import Modal from "../UI/Modal";
import Catalog from "../catalog/Catalog";
import CartModal from "../cart/CartModal";

import styles from "./Header.module.css";
import Cart from "../cart/Cart";
import { observer } from "mobx-react";
import { Context } from "../../App";

const Header: React.FC = observer(() => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartIsOpen, setCartIsOpen } = React.useContext(Context);
  return (
    <header className={styles.header}>
      <Container className="align-center" fluid="md">
        <Row>
          <Col className="text-center " sm={2}>
            <Button onClick={() => setIsOpen(true)} variant="primary">
              Каталог
            </Button>
          </Col>
          <Col className="text-center " sm={8}></Col>
          <Col className="text-center " sm={2}>
            <Button onClick={() => setCartIsOpen(true)} variant="primary">
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <Catalog handleClose={() => setIsOpen(false)} />
      </Modal>
      <CartModal handleClose={() => setCartIsOpen(false)} isOpen={cartIsOpen}>
        <Cart />
      </CartModal>
    </header>
  );
});

export default Header;
