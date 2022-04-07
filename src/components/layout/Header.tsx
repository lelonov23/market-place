import React from "react";
import {
  InputGroup,
  FormControl,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container className="align-center" fluid="md">
        <Row>
          <Col className="text-center " sm={2}>
            <Button variant="primary">Каталог</Button>
          </Col>
          <Col className="text-center " sm={8}></Col>
          <Col className="text-center " sm={2}>
            <i className="fa-solid fa-cart-shopping"></i>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
