import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Component
import BreadCrumbs from "components/common/BreadCrumbs";

// API
import { getProduct } from "api/";

const Product = () => {
  // Params
  const { productId } = useParams<{ productId: string }>();

  // API Call
  const { data, isLoading } = useQuery({
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
        <Col md={5} lg={5} className="mt-4">
          Image
        </Col>
        <Col md={7} lg={7} className="mt-4">
          Detail
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
