export const NAME = "QUERY";

export const SAVE_QUERY = `${NAME}/SAVE_QUERY`;
export const SAVE_QUERY_SUCCESS = `${NAME}/SAVE_QUERY_SUCCESS`;
export const SAVE_QUERY_FAIL = `${NAME}/SAVE_QUERY_FAIL`;
export const RESET_SAVE_QUERY = `${NAME}/RESET_SAVE_QUERY`;

export const getSaveQueryData = store => store[NAME].saveQuery;

export const saveQuery = data => ({
    type: SAVE_QUERY,
    data
});

export const saveQuerySuccess = data => ({
    type: SAVE_QUERY_SUCCESS,
    data
});

export const saveQueryFail = error => ({
    type: SAVE_QUERY_FAIL,
    error
});
