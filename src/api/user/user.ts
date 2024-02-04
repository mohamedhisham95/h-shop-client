import { getRequest, defaultHeaders } from "utils/http-request";

export const getUserProfile = async ({ queryKey }: any) => {
  if (queryKey.length === 1) queryKey.push({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, body] = queryKey;

  const { data } = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/user/profile`,
    body,
    await defaultHeaders()
  );

  return data;
};
