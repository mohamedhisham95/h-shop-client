import { Button, ListGroup, Row, Col } from "react-bootstrap";

type props = {
  data: any;
};

const OrderUpdate: React.FC<props> = ({ data }) => {
  function handleStatusUpdate(type: any, value: any) {
    console.log(type, value);
  }

  return (
    <ListGroup.Item>
      <h3 className="mb-3">Tracking Details</h3>
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleStatusUpdate("isShipped", data?.isShipped)}
          >
            Update to shipped
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleStatusUpdate("isShipped", data?.isDelivered)}
          >
            Update to Delivered
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default OrderUpdate;
