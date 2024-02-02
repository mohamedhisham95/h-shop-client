import { getRequest, postRequest, defaultHeaders } from "utils/http-request";

export const getProductCountByCategory = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/dashboard/product-category-stats`,
    {},
    await defaultHeaders()
  );

  return response;
};

export const getOrderCountFromSpecificDays = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/dashboard/order-stats`,
    body,
    await defaultHeaders()
  );

  return response;
};

export const getUserCountFromSpecificDays = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/dashboard/user-stats`,
    body,
    await defaultHeaders()
  );

  return response;
};
