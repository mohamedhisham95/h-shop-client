import {
  getRequest,
  defaultHeaders,
  postRequest,
  putRequest,
} from "utils/http-request";

export const getAllProducts = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/product/list`,
    {},
    await defaultHeaders()
  );

  return response;
};

export const createProduct = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    { name, image, brand, categoryId, description, price, countInStock },
  ] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/product/create`,
    {
      name,
      image,
      brand,
      categoryId,
      description,
      price,
      countInStock,
    },
    await defaultHeaders()
  );

  return response;
};

export const updateProduct = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    { id, name, image, brand, categoryId, description, price, countInStock },
  ] = queryKey;

  const response = await putRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/product/update`,
    {
      id,
      name,
      image,
      brand,
      categoryId,
      description,
      price,
      countInStock,
    },
    await defaultHeaders()
  );

  return response;
};

export const deleteProduct = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const { data } = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/product/delete`,
    body,
    await defaultHeaders()
  );

  return data;
};
