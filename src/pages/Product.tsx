import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Rating from "components/product/Rating";

// API
import { getProduct } from "api/";

// Redux
import { cartAddItem, cartRemoveItem } from "redux/cartSlice";

const Product = () => {
  // Params
  const { productId } = useParams<{ productId: string }>();

  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { cart_items } = useSelector((state: any) => state.cart);

  // API Call
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_product",
      {
        productId,
      },
    ],
    queryFn: getProduct,
  });

  // Cart Handler
  function handleCart(operation: string) {
    if (operation === "add") {
      dispatch(cartAddItem(data?._id));
    } else {
      dispatch(cartRemoveItem(data?._id));
    }
  }

  return (
    <Container className="product">
      <BreadCrumbs
        list={[
          { link: "/", label: "Home" },
          { link: "", label: "Product" },
        ]}
      />

      <Row>
        {isLoading && (
          <Col md={12} lg={12}>
            <Loader variant="primary" />
          </Col>
        )}

        {isError && (
          <Col md={12} lg={12}>
            <Message message={error?.message} />
          </Col>
        )}

        {data && (
          <>
            <Col md={5} lg={5}>
              <Image src={data?.image} alt={data?.name} fluid />
            </Col>
            <Col md={7} lg={7} className="mt-4">
              <ul className="detail-list">
                <li>
                  <h4>{data?.name}</h4>
                </li>
                <li>
                  <h5>₹{data.price}</h5>
                </li>
                <li>
                  <h5>
                    {data.countInStock > 0 ? (
                      <Badge variant="success">Available In Stock</Badge>
                    ) : (
                      <Badge variant="danger">Out Of Stock</Badge>
                    )}
                  </h5>
                </li>
                <li>{data?.description}</li>
                <li>
                  <Rating value={data.rating} text={data.reviewsCount} />
                </li>

                {/* {data.countInStock > 0 && (
                  <li>
                    <Button
                      variant="info"
                      size="sm"
                      type="button"
                      onClick={() => handleCartAddItem()}
                    >
                      Add To Cart
                    </Button>
                  </li>
                )} */}

                {cart_items.find((element: any) => element === data._id) ? (
                  <Button
                    type="button"
                    disabled={data.countInStock === 0}
                    size="sm"
                    variant="danger"
                    onClick={() => handleCart("remove")}
                  >
                    {/* <i className="fas fa-trash px-1"></i> */}
                    Remove From Cart
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={data.countInStock === 0}
                    size="sm"
                    onClick={() => handleCart("add")}
                  >
                    {/* <i className="fas fa-shopping-cart px-1"></i> */}
                    Add To Cart
                  </Button>
                )}
              </ul>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Product;
