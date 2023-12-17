import { getRequest, defaultHeaders, postRequest } from "utils/http-request";

export const createOrder = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    { shippingAddress, paymentMethod, orderItems, totalAmount, token },
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/order/checkout`,
    {
      shippingAddress,
      paymentMethod,
      orderItems,
      totalAmount,
      token,
    },
    await defaultHeaders()
  );

  return response;
};

export const getMyOrders = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/order/my-orders`,
    {},
    await defaultHeaders()
  );

  return response;
};

export const getMyOrderById = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/order/my-order`,
    body,
    await defaultHeaders()
  );

  return data;
};
