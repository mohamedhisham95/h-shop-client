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
import { useHistory } from "react-router-dom";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import BreadCrumbs from "components/common/BreadCrumbs";

// API
import { getCartProducts } from "api/";

// Redux
import { cartRemoveItem, clearCart } from "redux/cartSlice";
import {
  checkoutItems,
  updateQuantity,
  checkoutCartRemoveItem,
  checkoutCartClear,
} from "redux/cartCheckoutSlice";

const Cart = () => {
  // History
  const history = useHistory();

  // Dispatch
  const dispatch = useDispatch();

  // Ref
  const isMounted = useRef(true);

  // Redux State
  const { cart_items } = useSelector((state: any) => state.cart);
  const { checkout_items } = useSelector((state: any) => state.cartCheckout);

  // API Call
  const { data, isError, error, isFetching }: any = useQuery({
    queryKey: [
      "get_cart_products",
      {
        productIds: cart_items,
      },
    ],
    queryFn: getCartProducts,
    enabled: cart_items?.length > 0 && isMounted?.current,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      dispatch(
        checkoutItems(res?.data?.filter((ele: any) => ele.countInStock > 0))
      );
    },
  });

  // Cart Handler
  function handleRemoveCartItem(productId: string) {
    dispatch(cartRemoveItem(productId));
    dispatch(checkoutCartRemoveItem(productId));
  }

  // Clear Cart Handler
  function handleClearCart() {
    dispatch(clearCart());
    dispatch(checkoutCartClear());
  }

  // Decrease Item Quantity
  function decreaseQuantity(productId: string) {
    let itemIndex = checkout_items.findIndex((x: any) => x._id === productId);
    let itemQuantity = checkout_items[itemIndex]["quantity"];

    if (itemQuantity > 1) {
      let updatedItemQuantity = itemQuantity - 1;
      dispatch(
        updateQuantity({
          id: productId,
          qty: Number(updatedItemQuantity),
        })
      );
    }
  }

  // Increase Item Quantity
  function increaseQuantity(productId: string) {
    let itemIndex = checkout_items.findIndex((x: any) => x._id === productId);
    let itemQuantity = checkout_items[itemIndex]["quantity"];

    if (itemQuantity >= 1) {
      let updatedItemQuantity = itemQuantity + 1;
      dispatch(
        updateQuantity({
          id: productId,
          qty: Number(updatedItemQuantity),
        })
      );
    }
  }

  // Handle Checkout
  function handleCheckOut() {
    history.push("/checkout");
  }

  // UseEffect
  useEffect(() => {
    isMounted.current = false;
    return () => {};
  }, []);

  return (
    <Container fluid className="cart">
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Cart" },
        ]}
      />

      <Row>
        {cart_items.length === 0 && (
          <Col md={12} lg={12}>
            <Message message={"Cart is Empty"} />
          </Col>
        )}

        {isFetching && (
          <Col md={12} lg={12}>
            <Loader variant="primary" />
          </Col>
        )}

        {isError && (
          <Col md={12} lg={12}>
            <Message message={error?.message} />
          </Col>
        )}

        {!isFetching && cart_items.length > 0 && (
          <>
            <Col md={6}>
              <div className="d-flex justify-content-between flex-wrap">
                <h5>Your cart items</h5>
                {cart_items?.length > 0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    onClick={() => handleClearCart()}
                  >
                    Clear Cart
                  </Button>
                )}
              </div>
              <hr />

              <ListGroup variant="flush">
                {checkout_items
                  ?.filter((ele: any) => ele.countInStock > 0)
                  ?.map((cart: any, index: number) => (
                    <ListGroup.Item
                      key={index}
                      className="flex-column align-items-start px-0 py-2"
                    >
                      <div className="d-flex w-100">
                        <Image
                          src={cart?.image}
                          alt={cart?.name}
                          className="product-img"
                        />
                        <div className="d-flex flex-column flex-grow-1">
                          <p className="mb-1">{cart?.name}</p>
                          <p className="mb-1">₹{cart?.price}</p>
                          <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                className="text-primary"
                                disabled={cart?.quantity <= 1}
                                onClick={() => decreaseQuantity(cart?._id)}
                              >
                                -
                              </Button>
                            </InputGroup.Prepend>
                            <span className="px-2 d-flex align-items-center">
                              {cart?.quantity}
                            </span>
                            <InputGroup.Append>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                className="text-primary"
                                disabled={cart?.quantity >= cart?.countInStock}
                                onClick={() => increaseQuantity(cart?._id)}
                              >
                                +
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          type="button"
                          className="d-flex flex-column align-self-start"
                          onClick={() => handleRemoveCartItem(cart?._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>

              <hr />

              {data?.data?.filter((ele: any) => ele.countInStock === 0).length >
                0 && (
                <>
                  <h5>OOPS!, Below products are currently out of stock</h5>
                  <hr />
                  <ListGroup variant="flush">
                    {data?.data
                      ?.filter((ele: any) => ele.countInStock === 0)
                      ?.map((cart: any, index: number) => (
                        <ListGroup.Item
                          key={index}
                          className="flex-column align-items-start p-0"
                        >
                          <div className="d-flex w-100">
                            <Image
                              src={cart?.image}
                              alt={cart?.name}
                              className="product-img"
                            />
                            <div className="d-flex flex-column flex-grow-1">
                              <p className="mb-1">{cart?.name}</p>
                              <p className="mb-1">₹{cart?.price}</p>
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              type="button"
                              className="d-flex flex-column align-self-start"
                              onClick={() => handleRemoveCartItem(cart?._id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </>
              )}
            </Col>

            <Col md={6}>
              <h5>Cart Summary</h5>
              <hr />
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>
                      Subtotal (
                      {checkout_items.reduce(
                        (acc: any, item: any) => acc + item.quantity,
                        0
                      )}
                      ) items
                    </h4>
                    <h5>
                      Total Amount ₹
                      {checkout_items
                        .reduce(
                          (acc: any, item: any) =>
                            acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </h5>
                    {checkout_items.length > 0 && (
                      <Button
                        variant="success"
                        onClick={() => handleCheckOut()}
                      >
                        Proceed To Checkout{" "}
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
