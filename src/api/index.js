import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "user/loginByEmail", data);
};

export const result = data => {
  return fetchApi("get", "/", data);
};
