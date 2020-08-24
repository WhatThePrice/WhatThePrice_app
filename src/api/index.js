import fetchApi from "./helper";

const queryAPI = "https://api-sandbox-286406.et.r.appspot.com/api/v1/data";
const authAPI = "https://laravel-sandbox-whattheprice.herokuapp.com/api/";

export const login = data => {
  return fetchApi("post", authAPI, "user/loginByEmail", data);
};

export const result = data => {
  return fetchApi("get", queryAPI, `?q=${data.query}&user_id=${data.userID}`);
};
