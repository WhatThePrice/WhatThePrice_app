export const NAME = "QUERY";

export const GET_RESULT = `${NAME}/GET_RESULT`;
export const GET_RESULT_SUCCESS = `${NAME}/GET_RESULT_SUCCESS`;
export const GET_RESULT_FAIL = `${NAME}/GET_RESULT_FAIL`;
export const RESET_GET_RESULT = `${NAME}/RESET_GET_RESULT`;

export const getResultData = store => store[NAME].getResult;

export const getResult = data => ({
    type: GET_RESULT,
    data
});

export const getResultSuccess = data => ({
    type: GET_RESULT_SUCCESS,
    data
});

export const getResultFail = error => ({
    type: GET_RESULT_FAIL,
    error
});
