import { defaultHeaders, postRequest } from "utils/http-request";

export const createCategory = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    // { name },
    body,
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/category/create`,
    // {
    //   name,
    // },
    body,
    await defaultHeaders()
  );

  return response;
};

export const updateCategory = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    // { name },
    body,
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/category/update`,
    // {
    //   name,
    // },
    body,
    await defaultHeaders()
  );

  return response;
};
