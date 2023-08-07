import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  InputGroup,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";

const Checkout = () => {
  return (
    <Container fluid className="cart">
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Checkout" },
        ]}
      />
      <Row>
        <Col md={12} lg={12}>
          <Nav
            variant="pills"
            defaultActiveKey={1}
            className="d-flex justify-content-center"
            onSelect={() => alert("TESt")}
          >
            <Nav.Item>
              <Nav.Link as="div" eventKey={1}>
                1.Address
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={2}>2.Payment Method</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={3} disabled>
                3.Order
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
