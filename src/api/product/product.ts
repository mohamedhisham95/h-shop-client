import { getRequest, defaultHeaders } from "utils/http-request";

export const getProducts = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, { limit, skip }] = queryKey;

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/product/list`,
    {
      skip,
      limit,
    },
    await defaultHeaders()
  );

  return response;
};

export const getProduct = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, { productId }] = queryKey;

  const { data } = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/product/detail`,
    {
      id: productId,
    },
    await defaultHeaders()
  );

  return data;
};
