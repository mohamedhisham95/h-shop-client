import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Badge,
  Button,
  ListGroup,
} from "react-bootstrap";
import dayjs from "dayjs";

// Components
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { getMyOrderById } from "api/";

const MyOrder = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  console.log("id : ", id);

  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_my_order_id",
      {
        id: id,
      },
    ],
    queryFn: getMyOrderById,
    refetchOnWindowFocus: false,
  });

  console.log("Data :: ", data);

  return (
    <Container className="order">
      <BreadCrumbs
        list={[
          { link: "/", label: "My Orders" },
          { link: "", label: "Order" },
        ]}
      />

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
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 className="mb-3">Order Details</h3>
                  <p>
                    <span className="font-weight-bold"> Order #: </span>
                    <span className="text-uppercase">{data?._id}</span>
                  </p>
                  <p>
                    <span className="font-weight-bold"> Order Date: </span>
                    <span>{dayjs(data?.updatedAt).format("DD-MM-YYYY")}</span>
                  </p>
                  <p>
                    <span className="font-weight-bold">Total: </span>
                    <span>
                      ₹{data?.totalAmount} ({data?.orderItems?.length}{" "}
                      {data?.orderItems?.length === 1 ? "Item" : "Items"})
                    </span>
                  </p>
                </ListGroup.Item>

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
                    {/* {data.shippingAddress.country}. */}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3 className="mb-3">Payment Information</h3>
                  <p>
                    <span className="font-weight-bold">Payment Method: </span>{" "}
                    {data.paymentMethod}
                  </p>

                  {data.paymentResponse.isPaid && (
                    <Message
                      variant="success"
                      message={dayjs
                        .unix(data.paymentResponse.update_time)
                        .format("DD-MM-YYYY")}
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default MyOrder;
