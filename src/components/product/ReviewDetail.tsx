import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Component
import ReviewForm from "components/product/ReviewForm";
import ReviewList from "components/product/ReviewList";

const ReviewDetail = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  return (
    <Row>
      <Col md={6} lg={6} className="mb-3 mt-2">
        <ReviewForm productId={id} />
      </Col>

      <Col md={6} lg={6} className="mb-3 mt-2">
        <ReviewList />
      </Col>
    </Row>
  );
};

export default ReviewDetail;
