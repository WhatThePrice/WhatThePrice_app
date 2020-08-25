import fetchApi from "./helper";

// AUTH API
const authAPI = "https://laravel-sandbox-whattheprice.herokuapp.com/api";

// to login
export const login = data => {
  return fetchApi("post", authAPI, "/login", data);
};

// to register
export const register = data => {
  return fetchApi("post", authAPI, "/register", data);
};

// get user profile
export const getUserData = data => {
  return fetchApi("get", authAPI, "/getprofile", data);
};

// edit user profile
export const updateUserData = data => {
  return fetchApi("post", authAPI, "/profile", data);
};


// change user type
export const changeUserType = data => {
  return fetchApi("post", authAPI, "/usertype", data);
};


// QUERY API
const queryAPI = "https://api-sandbox-286406.et.r.appspot.com/api/v1/data";

// call query
export const result = data => {
  return fetchApi("get", queryAPI, `?q=${data.query}&user_id=${data.userID}`);
};

// save query to track
export const startTrack = (data, token) => {
  return fetchApi("post", queryAPI, "/querytracker", data, token);
};

// cancel tracking query
export const cancelTrack = (data, token) => {
  return fetchApi("post", queryAPI, "/cancelqtracker", data, token);
};



