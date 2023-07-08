import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Row, Col } from "react-bootstrap";

// Components
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { getProducts } from "api/api";

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
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
