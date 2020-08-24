export const NAME = "AUTH";

export const REGISTER = `${NAME}/REGISTER`;
export const REGISTER_SUCCESS = `${NAME}/REGISTER_SUCCESS`;
export const REGISTER_FAIL = `${NAME}/REGISTER_FAIL`;
export const RESET_REGISTER = `${NAME}/RESET_REGISTER`;

export const getRegisterData = store => store[NAME].register;

export const register = data => ({
    type: REGISTER,
    data
});

export const registerSuccess = data => ({
    type: REGISTER_SUCCESS,
    data
});

export const registerFail = error => ({
    type: REGISTER_FAIL,
    error
});

export const resetRegister = () => ({
    type: RESET_REGISTER
});
