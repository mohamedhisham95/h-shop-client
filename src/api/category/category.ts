import { getRequest, postRequest } from "utils/http-request";

export const getAllCategory = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key] = queryKey;

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/category/list`,
    {}
  );

  return response;
};

export const getCategoryById = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/category/detail`,
    body
  );

  return response;
};
