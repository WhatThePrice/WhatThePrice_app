import fetchApi from "./helper";

// AUTH & TRACK API 
const url = "https://laravel-sandbox-whattheprice.herokuapp.com/api";

// to login
export const login = data => {
  return fetchApi("post", url, "/login", data);
};

// to register
export const register = data => {
  return fetchApi("post", url, "/register", data);
};

// get user profile
export const getUser = () => {
  return fetchApi("get", url, "/profile");
};

// update user profile
export const updateUser = data => {
  return fetchApi("post", url, "/profile/update", data);
};

// upgrade user type
export const upgradeUser = token => {
  return fetchApi("get", url, "/user/upgrade", token);
};

// downgrade user type
export const downgradeUser = token => {
  return fetchApi("get", url, "/user/downgrade", token);
};

// save query to track
export const saveQuery = (data, headers) => {
  return fetchApi("post", url, "/tracker/query/save", data, headers);
};

// save product to track
export const saveProduct = (data, token) => {
  return fetchApi("post", url, "/tracker/product/save", data, token);
};

// cancel tracking query
export const cancelQuery = (data, token) => {
  return fetchApi("post", url, "/tracker/query/cancel", data, token);
};

// cancel tracking product
export const cancelProduct = (data, token) => {
  return fetchApi("post", url, "/tracker/product/cancel", data, token);
};

// get query tracking data
export const getQuery = () => {
  return fetchApi("get", url, "/price/query/list");
};

// get product tracking data
export const getProduct = () => {
  return fetchApi("get", url, "/price/product/list");
};


// QUERY API
const queryAPI = "https://api-sandbox-286406.et.r.appspot.com/api/";

// call query
export const result = data => {
  return fetchApi("get", queryAPI, `scraper/query?q=${data.query}&user_id=${data.userID}`);
};



