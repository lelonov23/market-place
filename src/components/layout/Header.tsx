import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

import Modal from "../UI/Modal";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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
            <i className="fa-solid fa-cart-shopping"></i>
          </Col>
        </Row>
      </Container>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <p>modal content</p>
      </Modal>
    </header>
  );
};

export default Header;
