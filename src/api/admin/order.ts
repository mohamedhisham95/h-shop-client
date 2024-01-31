import { getRequest, putRequest, defaultHeaders } from "utils/http-request";

export const getAllOrders = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/order/list`,
    {},
    await defaultHeaders()
  );

  return response;
};

export const getOrderById = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/order/detail`,
    body,
    await defaultHeaders()
  );

  return data;
};

export const updateOrderStatus = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const { data } = await putRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/order/update-status`,
    body,
    await defaultHeaders()
  );

  return data;
};
