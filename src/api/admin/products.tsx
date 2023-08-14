import { getRequest, defaultHeaders, postRequest } from "utils/http-request";

export const getAllProducts = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/product/list`,
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
