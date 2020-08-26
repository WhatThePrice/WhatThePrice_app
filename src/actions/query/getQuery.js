export const NAME = "QUERY";

export const GET_QUERY = `${NAME}/GET_QUERY`;
export const GET_QUERY_SUCCESS = `${NAME}/GET_QUERY_SUCCESS`;
export const GET_QUERY_FAIL = `${NAME}/GET_QUERY_FAIL`;
export const RESET_GET_QUERY = `${NAME}/RESET_GET_QUERY`;

export const getQueryData = store => store[NAME].getQuery;

export const getQuery = data => ({
    type: GET_QUERY,
    data
});

export const getQuerySuccess = data => ({
    type: GET_QUERY_SUCCESS,
    data
});

export const getQueryFail = error => ({
    type: GET_QUERY_FAIL,
    error
});
