import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

// Components
import Rating from "./Rating";

type props = {
  product: any;
};

const ProductCard: React.FC<props> = ({ product }) => {
  // Redux State
  const { theme } = useSelector((state: any) => state.common);

  return (
    <Card
      bg={theme === "dark" ? "primary" : "light"}
      border={theme === "dark" ? "light" : "primary"}
      className="my-3 rounded product-card"
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          className="product-card-image"
        />

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title
              as="div"
              className={theme === "dark" ? "text-light" : "text-primary"}
            >
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating value={product.rating} text={product.reviewsCount} />
          </Card.Text>

          <Card.Text
            as="h4"
            className={theme === "dark" ? "text-light" : "text-primary"}
          >
            ₹{product.price}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
