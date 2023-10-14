import {
  getRequest,
  defaultHeaders,
  postRequest,
  putRequest,
} from "utils/http-request";

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
