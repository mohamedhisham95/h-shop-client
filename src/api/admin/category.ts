import { defaultHeaders, postRequest } from "utils/http-request";

export const createCategory = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    body,
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/category/create`,
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
    body,
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/category/update`,
    body,
    await defaultHeaders()
  );

  return response;
};

export const deleteCategory = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    body,
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/category/delete`,
    body,
    await defaultHeaders()
  );

  return response;
};
