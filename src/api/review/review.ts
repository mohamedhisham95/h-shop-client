import { getRequest, postRequest, defaultHeaders } from "utils/http-request";

export const getReviews = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/review/list`,
    body,
    await defaultHeaders()
  );

  return response;
};

export const addReview = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/review/add`,
    body,
    await defaultHeaders()
  );

  return response;
};

export const deleteReview = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/review/delete`,
    body,
    await defaultHeaders()
  );

  return response;
};
