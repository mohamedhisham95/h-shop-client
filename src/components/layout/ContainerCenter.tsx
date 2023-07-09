import { Row, Col } from "react-bootstrap";

type props = {
  children: React.ReactNode;
};

const ContainerCenter: React.FC<props> = ({ children }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="mt-3">
        {children}
      </Col>
    </Row>
  );
};

export default ContainerCenter;
