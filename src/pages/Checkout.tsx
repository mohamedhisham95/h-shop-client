import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  InputGroup,
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
    </Container>
  );
};

export default Checkout;
