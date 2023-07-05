import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Rest API
import { getProducts } from "rest-api/rest-api";

const Home = () => {
  // Limit
  const limit = 2;

  // API Call
  const { fetchNextPage, isLoading } = useInfiniteQuery({
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

  return <div>Home</div>;
};

export default Home;
