import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "../UI/Modal";
import Catalog from "../catalog/Catalog";
import CartModal from "../cart/CartModal";

import styles from "./Header.module.css";
import { observer } from "mobx-react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

const Header: React.FC = observer(() => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartIsOpen, setCartIsOpen } = React.useContext(Context);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Container className="align-center" fluid="md">
        <Row>
          <Col className="text-center " sm={2}>
            <Button onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button onClick={() => setIsOpen(true)} variant="primary">
              Каталог
            </Button>
          </Col>
          <Col className="text-center " sm={8}>
            <div className={styles.wrapper}>
              <input
                className={styles.search}
                type="text"
                name="search"
                id="search"
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </Col>
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
      <CartModal
        handleClose={() => setCartIsOpen(false)}
        isOpen={cartIsOpen}
      ></CartModal>
    </header>
  );
});

export default Header;
