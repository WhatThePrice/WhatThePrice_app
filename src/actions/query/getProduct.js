export const NAME = "QUERY";

export const GET_PRODUCT = `${NAME}/GET_PRODUCT`;
export const GET_PRODUCT_SUCCESS = `${NAME}/GET_PRODUCT_SUCCESS`;
export const GET_PRODUCT_FAIL = `${NAME}/GET_PRODUCT_FAIL`;
export const RESET_GET_PRODUCT = `${NAME}/RESET_GET_PRODUCT`;

export const getProductData = store => store[NAME].getProduct;

export const getProduct = data => ({
    type: GET_PRODUCT,
    data
});

export const getProductSuccess = data => ({
    type: GET_PRODUCT_SUCCESS,
    data
});

export const getProductFail = error => ({
    type: GET_PRODUCT_FAIL,
    error
});
