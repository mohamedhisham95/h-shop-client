import { getRequest, defaultHeaders } from "utils/http-request";

export const getProductCountByCategory = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/dashboard/product-category/stats`,
    {},
    await defaultHeaders()
  );

  return response;
};
