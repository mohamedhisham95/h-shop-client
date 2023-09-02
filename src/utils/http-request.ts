import axios from "axios";

export async function defaultHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("h-shop-token")}`,
  };
}

export async function getRequest(
  url = "",
  queryParams = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  let baseURL = url;

  if (Object.keys(queryParams).length) {
    baseURL += `?${new URLSearchParams(queryParams).toString()}`;
  }

  try {
    const response = await axios({
      method: "GET",
      baseURL,
      headers,
    });

    return response;
  } catch (error: any) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
}

export async function postRequest(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await axios({
      method: "POST",
      data,
      url,
      headers,
    });

    return response;
  } catch (error: any) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
}

export async function putRequest(
  url = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await axios({
      method: "PUT",
      data,
      url,
      headers,
    });

    return response;
  } catch (error: any) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
}
