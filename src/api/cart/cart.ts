import { postRequest, defaultHeaders } from "utils/http-request";

export const getCartProducts = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, { productIds }] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/cart/list`,
    {
      productIds,
    },
    await defaultHeaders()
  );

  return response;
};
