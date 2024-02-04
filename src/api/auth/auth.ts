import { postRequest } from "utils/http-request";

export const signin = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/auth/signin`,
    body
  );

  return response;
};

export const signup = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const response = await postRequest(
    `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
    body
  );

  return response;
};
