import {
  ListGroup,
  Container,
  Row,
  Col,
  Table,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BsArrowLeftCircle } from "react-icons/bs";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { createOrder } from "api/";

// Utils
import { toastNotification } from "utils/toast-notification";

type props = {
  setActiveStep: any;
};

const PlaceOrder: React.FC<props> = ({ setActiveStep }) => {
  // History
  const history = useHistory();

  // Redux State
  const { user_detail } = useSelector((state: any) => state.user);
  const { checkout_items } = useSelector((state: any) => state.cartCheckout);
  const { shipping_address, payment_method } = useSelector(
    (state: any) => state.checkout
  );

  // State
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<any>({
    status: null,
    message: null,
  });

  // Mutation
  const createMutation = useMutation({
    mutationFn: ({
      shippingAddress,
      paymentMethod,
      orderItems,
      totalAmount,
      token,
    }: any) =>
      createOrder([
        "create_order",
        { shippingAddress, paymentMethod, orderItems, totalAmount, token },
      ]),
    onError: (error: any) => {
      setPaymentLoading(false);
      setPaymentStatus({
        status: error.status,
        message: error.message,
      });
    },
    onSuccess: (response: any) => {
      if (response?.data?.status === "success") {
        setPaymentStatus({
          status: response?.data?.status,
          message: response?.data?.message,
        });
        toastNotification("success", response?.data?.message, 1500);
        setTimeout(() => {
          history.push(`/my-order/${response?.data?.orderId}`);
        }, 2000);
      }
    },
  });

  // Handle Payment
  async function handlePaymentToken(token: any) {
    setPaymentLoading(true);
    createMutation.mutate({
      shippingAddress: {
        address: shipping_address.address,
        city: shipping_address.city,
        postalCode: shipping_address.postal_code,
      },
      paymentMethod: payment_method,
      orderItems: checkout_items.map(
        ({ _id, name, image, price, quantity }: any) => ({
          productId: _id,
          name,
          image,
          price,
          quantity,
        })
      ),
      totalAmount: checkout_items?.reduce(
        (acc: any, item: any) => acc + item.price * item.quantity,
        0
      ),
      token,
    });
  }

  return (
    <Container fluid className="place-order">
      <Row>
        <Col md={8} className="mt-3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping Address</h3>
              <p>
                <strong>Name: </strong>
                {user_detail?.name}
              </p>
              <p>
                <strong>Email: </strong>
                {user_detail?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {shipping_address.address}, {shipping_address.city},{" "}
                {shipping_address.postal_code}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                {payment_method}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              <Table striped hover responsive className="table-sm">
                <tbody>
                  {checkout_items?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="product-img"
                        />
                      </td>
                      <td>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td>
                        {item.quantity} x {item.price} = ₹
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Summary */}
        <Col md={4} className="mt-3">
          <Card bg="Primary">
            <Card.Header>
              <h3>Order Summary</h3>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Total Item:</Col>
                  <Col>{checkout_items?.length}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant="info">
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    ₹
                    {checkout_items?.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {paymentLoading && (
                  <div className="d-flex justify-content-center flex-column">
                    <Loader loaderSize="small" />
                    <span className="text-center">
                      Payment is processing...
                    </span>
                  </div>
                )}
                {!paymentLoading &&
                  payment_method === "Stripe" &&
                  paymentStatus.status !== "success" && (
                    <StripeCheckout
                      stripeKey={`${process.env.REACT_APP_STRIPE_KEY}`}
                      token={handlePaymentToken}
                      name="H-Shop"
                      amount={
                        checkout_items?.reduce(
                          (acc: any, item: any) =>
                            acc + item.price * item.quantity,
                          0
                        ) * 100
                      }
                      currency="INR"
                      panelLabel="Pay {{amount}}"
                      label="Pay Now"
                    ></StripeCheckout>
                  )}
              </ListGroup.Item>

              {paymentStatus.status === "failure" && (
                <ListGroup.Item>
                  <Message message={paymentStatus.message} />
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  variant="primary"
                  type="button"
                  className="form-button"
                  onClick={() => setActiveStep(1)}
                >
                  Back <BsArrowLeftCircle />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Toast */}
      <Toaster />
    </Container>
  );
};

export default PlaceOrder;
