import axios from "axios";

export const configureInterceptor = () => {};
const baseToken = "716cdcf6-84d3-4aa0-8f3c-8c81f24621db";

export const getHeader = () => {
  return {
    "Content-Type": "multipart/form-data",
    "X-API-VERSION": "1.4.24",
    exchangeId: 2,
    language: "en",
    "X-API-VERSION": "1.4.24",
    exchangeId: "2",
    language: "en",
    source: "2"
  };
};

const getFullUrl = endpoint => {
  return "http://api.orionex.cc/" + endpoint;
};

const fetchApi = (method, endpoint, params, headers) =>
  axios({
    method,
    headers: headers || getHeader(),
    url: getFullUrl(endpoint),
    data: params
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));

export default fetchApi;
