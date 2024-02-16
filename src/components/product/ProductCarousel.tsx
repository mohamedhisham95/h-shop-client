import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Component
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { getTopRatedProducts } from "api/";

const ProductCarousel = () => {
  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: ["get_top_rated_product"],
    queryFn: getTopRatedProducts,
  });

  return (
    <div className="w-100 product-carousel">
      {isLoading && (
        <div className="pt-3">
          <Loader />
        </div>
      )}

      {isError && (
        <div className="pt-3">
          <Message message={error.message} />
        </div>
      )}

      {!isLoading && (
        <Carousel pause="hover" className="bg-dark mb-2">
          {data?.map((product: any) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h4>
                    {product.name} (₹{product.price})
                  </h4>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;
