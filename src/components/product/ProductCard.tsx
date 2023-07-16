import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// Components
import Rating from "./Rating";

type props = {
  product: any;
};

const ProductCard: React.FC<props> = ({ product }) => {
  return (
    <Card border="primary" className="my-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          className="product-card-image"
        />

        <Card.Body>
          <Card.Title as="div" className="text-primary">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <Rating value={product.rating} text={product.reviewsCount} />
          </Card.Text>

          <Card.Text as="h4" className="text-primary">
            ₹{product.price}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
