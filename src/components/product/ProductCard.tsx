import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

type props = {
  product: any;
};

const ProductCard: React.FC<props> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          className="product-card-image"
        />

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            {/* <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            /> */}
          </Card.Text>

          <Card.Text as="h4">₹{product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
