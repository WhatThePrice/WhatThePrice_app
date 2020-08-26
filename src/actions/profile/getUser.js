export const NAME = "PROFILE";

export const GET_USER = `${NAME}/GET_USER`;
export const GET_USER_SUCCESS = `${NAME}/GET_USER_SUCCESS`;
export const GET_USER_FAIL = `${NAME}/GET_USER_FAIL`;
export const RESET_GET_USER = `${NAME}/RESET_GET_USER`;

export const getUserData = store => store[NAME].getUser;

export const getUser = data => ({
    type: GET_USER,
    data
});

export const getUserSuccess = data => ({
    type: GET_USER_SUCCESS,
    data
});

export const getUserFail = error => ({
    type: GET_USER_FAIL,
    error
});

export const resetGetUser = () => ({
    type: RESET_GET_USER
});
