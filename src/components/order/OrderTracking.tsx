import { ListGroup } from "react-bootstrap";

// Utils
import { formatDateAndTime } from "utils/date-helpers";

type props = {
  data: any;
};

const OrderTracking: React.FC<props> = ({ data }) => {
  return (
    <ListGroup.Item>
      <h3 className="mb-3">Tracking Details</h3>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <p>Shipping :</p>

          {data?.isShipped ? (
            <p className="text-success">
              Shipped at ${formatDateAndTime(data?.shippedAt)}
            </p>
          ) : (
            <p className="text-info">Preparing for shipping...</p>
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          <p>Delivery :</p>
          {data?.isDelivered ? (
            <p className="text-success">
              Delivered at ${formatDateAndTime(data?.deliveredAt)}
            </p>
          ) : data?.isShipped ? (
            <p className="text-info">Preparing for Delivery</p>
          ) : (
            <p className="text-info">Status will be updated after shipping</p>
          )}
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  );
};

export default OrderTracking;
