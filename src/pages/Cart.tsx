import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import BreadCrumbs from "components/common/BreadCrumbs";

// API
import { getCartProducts } from "api/";

// Redux
import { cartRemoveItem } from "redux/cartSlice";
import { checkoutItems } from "redux/cartCheckoutSlice";

const Cart = () => {
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
      console.log("REs : ", res);
      dispatch(
        checkoutItems(res?.data?.filter((ele: any) => ele.countInStock > 0))
      );
    },
  });

  // Cart Handler
  function handleCart(productId: string) {
    dispatch(cartRemoveItem(productId));
  }

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
              <h5>Your cart items</h5>
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
                          <p className="mb-1">{cart?.price}</p>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          type="button"
                          className="d-flex flex-column align-self-start"
                          onClick={() => handleCart(cart?._id)}
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
                              <p className="mb-1">{cart?.price}</p>
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              type="button"
                              className="d-flex flex-column align-self-start"
                              onClick={() => handleCart(cart?._id)}
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
              <Card>Test</Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
