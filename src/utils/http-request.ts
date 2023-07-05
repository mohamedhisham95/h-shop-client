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

  // const response = await axios({
  //   method: "GET",
  //   baseURL,
  //   headers,
  // });

  const response = await fetch(baseURL, {
    method: "GET",
    mode: "cors",
    headers,
    referrerPolicy: "no-referrer",
  });

  console.log(response);

  return response.json();
}
