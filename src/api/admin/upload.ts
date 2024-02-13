import axios from "axios";
import { uploadHeaders } from "utils/http-request";

export const imageUpload = async (data: FormData) => {
  // if (queryKey.length === 1) queryKey.push({});

  // const [
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   key,
  //   body,
  // ] = queryKey;

  // const response = await postRequest(
  //   `${process.env.REACT_APP_SERVER_URL}/admin/upload/image`,
  //   body,
  //   await uploadHeaders()
  // );

  // return response;

  try {
    const response = await axios({
      method: "POST",
      data,
      url: `${process.env.REACT_APP_SERVER_URL}/admin/upload/image`,
      headers: await uploadHeaders(),
    });

    return response;
  } catch (error: any) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
