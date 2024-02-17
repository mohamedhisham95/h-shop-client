import { Nav } from "react-bootstrap";

type props = {
  activeStep: number;
};

const Steps: React.FC<props> = ({ activeStep }) => {
  return (
    <Nav
      variant="pills"
      activeKey={activeStep}
      className="d-flex justify-content-center mb-3"
    >
      <Nav.Item>
        <Nav.Link as="div" eventKey={1}>
          1.Address
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as="div" eventKey={2}>
          2.Payment Method
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as="div" eventKey={3}>
          3.Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Steps;
