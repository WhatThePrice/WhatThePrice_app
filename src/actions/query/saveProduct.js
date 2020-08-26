export const NAME = "QUERY";

export const SAVE_PRODUCT = `${NAME}/SAVE_PRODUCT`;
export const SAVE_PRODUCT_SUCCESS = `${NAME}/SAVE_PRODUCT_SUCCESS`;
export const SAVE_PRODUCT_FAIL = `${NAME}/SAVE_PRODUCT_FAIL`;
export const RESET_SAVE_PRODUCT = `${NAME}/RESET_SAVE_PRODUCT`;

export const getSaveProductData = store => store[NAME].saveProduct;

export const saveProduct = data => ({
    type: SAVE_PRODUCT,
    data
});

export const saveProductSuccess = data => ({
    type: SAVE_PRODUCT_SUCCESS,
    data
});

export const saveProductFail = error => ({
    type: SAVE_PRODUCT_FAIL,
    error
});
