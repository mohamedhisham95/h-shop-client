import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import Steps from "components/checkout/Steps";
import Address from "components/checkout/Address";
import PaymentMethod from "components/checkout/PaymentMethod";
import PlaceOrder from "components/checkout/PlaceOrder";

// Utils
import { checkoutPage } from "static-data/breadcrumbs-data";

const Checkout = () => {
  // History
  const history = useHistory();

  // Redux State
  const { checkout_items } = useSelector((state: any) => state.cartCheckout);

  // State
  const [activeStep, setActiveStep] = useState(1);

  // UseEffect Checks For Checkout Cart Items Length If 0 Redirects To Cart Page
  useEffect(() => {
    if (checkout_items.length === 0) {
      history.push("/cart");
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout_items]);

  return (
    <Container className="checkout">
      <BreadCrumbs list={checkoutPage} />
      <Row>
        <Col md={12} lg={12}>
          <Steps activeStep={activeStep} />
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={12}>
          {activeStep === 1 && <Address setActiveStep={setActiveStep} />}
          {activeStep === 2 && <PaymentMethod setActiveStep={setActiveStep} />}
          {activeStep === 3 && <PlaceOrder setActiveStep={setActiveStep} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
