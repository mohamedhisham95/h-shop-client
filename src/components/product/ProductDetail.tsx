import { Row, Col, Image, Badge, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Rating from "components/product/Rating";

// API
import { getProduct } from "api/";

// Redux
import { cartAddItem, cartRemoveItem } from "redux/cartSlice";

// Utils
import { toastNotification } from "utils/toast-notification";

const ProductDetail = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { cart_items } = useSelector((state: any) => state.cart);

  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_product",
      {
        id,
      },
    ],
    queryFn: getProduct,
  });

  // Cart Handler
  function handleCart(operation: string) {
    if (operation === "add") {
      dispatch(cartAddItem(data?._id));
      toastNotification("success", "Added to cart");
    } else {
      dispatch(cartRemoveItem(data?._id));
      toastNotification("success", "Removed from cart");
    }
  }

  return (
    <Row>
      {isLoading && (
        <Col md={12} lg={12} className="mb-4">
          <Loader />
        </Col>
      )}

      {isError && (
        <Col md={12} lg={12} className="mb-4">
          <Message message={error?.message} />
        </Col>
      )}

      {data && (
        <>
          <Col md={5} lg={5} className="mb-4">
            <Image src={data?.image} alt={data?.name} className="main-img" />
          </Col>
          <Col md={7} lg={7} className="mb-4">
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
                <Rating
                  value={data.rating}
                  count={data.reviewsCount}
                  showCount={true}
                />
              </li>

              <li>
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
              </li>
            </ul>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProductDetail;
