import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Row, Col } from "react-bootstrap";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import ProductCard from "components/product/ProductCard";

// API
import { getProducts } from "api";

const Home = () => {
  // Limit
  const limit = 2;

  // API Call
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  }: any = useInfiniteQuery({
    queryKey: [
      "get_products",
      {
        skip: 0,
        limit,
      },
    ],
    queryFn: ({ pageParam = 0 }) =>
      getProducts([
        "get_products",
        {
          skip: pageParam * limit,
          limit,
        },
      ]),
    getNextPageParam: (lastPage: any, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage: any, pages) => firstPage.prevCursor,
  });

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="mt-2">
          {isLoading && <Loader />}
          {isError && <Message message={error?.message} />}

          <Row>
            {data?.pages?.map((page: any) =>
              page?.data?.products.map((product: any, index: number) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
