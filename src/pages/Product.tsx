import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Component
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { getProduct } from "api/";

const Product = () => {
  // Params
  const { productId } = useParams<{ productId: string }>();

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

  return (
    <Container>
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
            <Col md={5} lg={5} className="mt-4">
              Image
            </Col>
            <Col md={7} lg={7} className="mt-4">
              Detail
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Product;
