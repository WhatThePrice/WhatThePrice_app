export const NAME = "QUERY";

export const RESULT = `${NAME}/RESULT`;
export const RESULT_SUCCESS = `${NAME}/RESULT_SUCCESS`;
export const RESULT_FAIL = `${NAME}/RESULT_FAIL`;
export const RESET_RESULT = `${NAME}/RESET_RESULT`;

export const getResultData = store => store[NAME].result;

export const result = data => ({
    type: RESULT,
    data
});

export const resultSuccess = data => ({
    type: RESULT_SUCCESS,
    data
});

export const resultFail = error => ({
    type: RESULT_FAIL,
    error
});
