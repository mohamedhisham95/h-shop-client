import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import BreadCrumbs from "components/common/BreadCrumbs";

// API
import { getCartProducts } from "api/";

// Redux
import { cartAddItem, cartRemoveItem } from "redux/cartSlice";

const Cart = () => {
  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { cart_items } = useSelector((state: any) => state.cart);

  // API Call
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_cart_products",
      {
        productIds: cart_items,
      },
    ],
    queryFn: getCartProducts,
  });

  // Cart Handler
  function handleCart(productId: string) {
    dispatch(cartRemoveItem(productId));
  }

  return (
    <Container fluid>
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Cart" },
        ]}
      />

      <Row>
        <Col md={12} className="mt-4">
          {cart_items.length === 0 ? (
            <Message message={"Cart is Empty"} />
          ) : (
            <p>Test</p>
          )}

          {/* <Row>
            {data?.pages?.map((page: any) =>
              page?.data?.products.map((product: any, index: number) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))
            )}
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
