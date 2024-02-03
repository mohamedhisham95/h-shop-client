import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

// Component
import BreadCrumbs from "components/common/BreadCrumbs";
import ProductDetail from "components/product/ProductDetail";
import ReviewDetail from "components/product/ReviewDetail";

// Utils
import { productPage } from "utils/breadcrumbs";

const Product = () => {
  return (
    <Container className="product">
      <BreadCrumbs list={productPage} />
      <ProductDetail />
      <ReviewDetail />
      {/* Toast */}
      <Toaster />
    </Container>
  );
};

export default Product;
