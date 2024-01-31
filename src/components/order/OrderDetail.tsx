import { Row, Col, Image, ListGroup, Table, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import OrderUpate from "components/order/OrderUpdate";

// Utils
import { formatDate, formatUnixDateAndTime } from "utils/date-helpers";

type props = {
  isLoading: any;
  isError: any;
  error: any;
  data: any;
};

const OrderDetail: React.FC<props> = ({ isLoading, isError, error, data }) => {
  // Redux State
  const { user_detail } = useSelector((state: any) => state.user);

  return (
    <Row>
      {isLoading && (
        <Col md={12} lg={12}>
          <Loader />
        </Col>
      )}

      {isError && (
        <Col md={12} lg={12}>
          <Message message={error?.message} />
        </Col>
      )}

      {data && (
        <>
          {/* Order */}
          <Col md={8} className="details">
            <ListGroup variant="flush">
              {/* Order Details */}
              <ListGroup.Item>
                <h3 className="mb-3">Order Details</h3>
                <p>
                  <span className="font-weight-bold"> Order #: </span>
                  <span className="text-uppercase">{data?._id}</span>
                </p>
                <p>
                  <span className="font-weight-bold"> Order Date: </span>
                  <span>{formatDate(data?.updatedAt)}</span>
                </p>
              </ListGroup.Item>

              {/* Shipping Address */}
              <ListGroup.Item>
                <h3 className="mb-3">Shipping Address</h3>
                <p>
                  <span className="font-weight-bold">Name: </span>{" "}
                  {data.userId.name}
                </p>
                <p>
                  <span className="font-weight-bold">Email: </span>
                  {data.userId.email}
                </p>
                <p>
                  <span className="font-weight-bold">Address: </span>
                  {data.shippingAddress.address}, {data.shippingAddress.city},{" "}
                  {data.shippingAddress.postalCode}{" "}
                </p>
              </ListGroup.Item>

              {/* Payment Information */}
              <ListGroup.Item>
                <h3 className="mb-3">Payment Information</h3>
                <p>
                  <span className="font-weight-bold">Payment Method: </span>{" "}
                  {data.paymentMethod}
                </p>
                <p>
                  <span className="font-weight-bold">Payment Time: </span>{" "}
                  {formatUnixDateAndTime(data.paymentResponse.update_time)}
                </p>
              </ListGroup.Item>

              {/* Tracking Details */}
              {user_detail.role === "Admin" ? <OrderUpate data={data} /> : null}

              {/* Item Details */}
              <ListGroup.Item>
                <h3 className="mb-3">Ordered Item(s)</h3>
                <Table striped hover responsive className="table-sm">
                  <tbody>
                    {data?.orderItems.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="table-product-image"
                          />
                        </td>
                        <td>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                          <p className="m-0">Price : ₹{item.price}</p>
                          <p className="m-0">
                            {item.quantity} x ₹{item.price} = ₹
                            {item.quantity * item.price}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Summary */}
          <Col md={4} className="mb-3">
            <Card bg="Primary">
              <Card.Header>
                <h3>Order Summary</h3>
              </Card.Header>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col className="font-weight-bold">
                      Total {data?.orderItems?.length === 1 ? "Item" : "Items"}:
                    </Col>
                    <Col>{data?.orderItems?.length}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  <Row>
                    <Col className="font-weight-bold">Total:</Col>
                    <Col>₹{data?.totalAmount}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
};

export default OrderDetail;
