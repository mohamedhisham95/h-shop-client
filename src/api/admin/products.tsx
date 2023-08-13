import { getRequest, defaultHeaders } from "utils/http-request";

export const getAllProducts = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/product/list`,
    await defaultHeaders()
  );

  return response;
};
