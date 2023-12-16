import {
  ListGroup,
  Container,
  Row,
  Col,
  Table,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { createOrder } from "api/";

type props = {
  setActiveStep: any;
};

const PlaceOrder: React.FC<props> = ({ setActiveStep }) => {
  // History
  const history = useHistory();

  // Redux State
  const { checkout_items } = useSelector((state: any) => state.cartCheckout);
  const { shipping_address, payment_method } = useSelector(
    (state: any) => state.checkout
  );

  // State
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

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
        "create_category",
        { shippingAddress, paymentMethod, orderItems, totalAmount, token },
      ]),
    onError: (error: any) => {
      setPaymentLoading(false);
      setPaymentStatus(error.message);
    },
    onSuccess: (response: any) => {
      if (response?.data?.status === "success") {
        history.push("/my-orders");
      }
    },
  });

  // Handle Payment
  async function handlePaymentToken(token: any) {
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
                <strong>Address: </strong>
                {shipping_address.address}, {shipping_address.city},{" "}
                {shipping_address.postal_code}, {shipping_address?.country}
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
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
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
                {paymentLoading && <Loader />}
                {!paymentLoading && payment_method === "Stripe" && (
                  //   <StripeCheckout
                  //     stripeKey="pk_test_51HqwsgBrBOrRrnlyyr8TGajVdskvU96Id2THwptH5sltl46vQbUnK7YHGEE0u3OFnlWRWWTTZ3wVzA1aIzbb06cq00X1Vuv0Gk"
                  //     token={() => handlePaymentToken()}
                  // amount={
                  //   checkout_items?.reduce(
                  //     (acc: any, item: any) =>
                  //       acc + item.price * item.quantity,
                  //     0
                  //   ) * 100
                  // }
                  // currency="INR"
                  // panelLabel="Pay {{amount}}"
                  //   >
                  //     {/* <Button className="btn-block btn-grad pay-button">
                  //       Pay with <i className="far fa-credit-card"></i>
                  //     </Button> */}
                  //     Pay
                  //   </StripeCheckout>
                  <StripeCheckout
                    // stripeKey="pk_test_51HqwsgBrBOrRrnlyyr8TGajVdskvU96Id2THwptH5sltl46vQbUnK7YHGEE0u3OFnlWRWWTTZ3wVzA1aIzbb06cq00X1Vuv0Gk"
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

              {paymentStatus === "failure" && (
                <ListGroup.Item>
                  <Message message="Payment Failed. Please Try Again" />
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
