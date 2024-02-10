import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import ProductCard from "components/product/ProductCard";

// API
import { getAllProductsByLimit } from "api";

// Hooks
import { useSearchQuery } from "hooks/useSearchQuery";

const Home = () => {
  // Hooks
  let query = useSearchQuery();

  // Query Params
  const searchKeyword = query.get("search");

  // Query
  const { data, fetchNextPage, hasNextPage, isFetched, isError, error }: any =
    useInfiniteQuery({
      queryKey: ["get_all_products_by_limit", { searchKeyword }],
      queryFn: ({ pageParam = 0 }) => {
        return getAllProductsByLimit([
          "get_all_products_by_limit",
          {
            skip: pageParam,
            ...(searchKeyword && {
              productKeyword: searchKeyword,
            }),
          },
        ]);
      },
      getNextPageParam: (lastPage: any) => {
        if (lastPage.data.prevOffset > lastPage.data.productCount) {
          return false;
        }

        return lastPage.data.prevOffset;
      },
    });

  const products = data?.pages.reduce((acc: any, page: any) => {
    return [...acc, ...page?.data.products];
  }, []);

  return (
    <Container fluid className="home">
      <Row>
        {!isFetched && (
          <Col md={12} className="mt-3">
            <Loader />
          </Col>
        )}

        {isError && (
          <Col md={12} className="mt-3">
            <Message message={error?.message} />
          </Col>
        )}

        {products?.length === 0 && (
          <Col md={12} className="mt-2">
            <Message variant="info" message={"No products found"} />
          </Col>
        )}

        <Col md={12} className="mt-2">
          <InfiniteScroll
            dataLength={products ? products.length : 0}
            next={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<Loader />}
          >
            <div>
              <Row>
                {products &&
                  products.map((product: any, index: number) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={4}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
            </div>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
