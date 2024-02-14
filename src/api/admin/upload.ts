import axios from "axios";
import { uploadHeaders } from "utils/http-request";

export const imageUpload = async (body: FormData) => {
  try {
    const { data } = await axios({
      method: "POST",
      data: body,
      url: `${process.env.REACT_APP_SERVER_URL}/admin/upload/image`,
      headers: await uploadHeaders(),
    });

    return data;
  } catch (error: any) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
