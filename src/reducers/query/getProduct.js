import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function getProduct(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.GET_PRODUCT:
            return {
                isLoading: true,
                error: null,
                data: {}
            };
        case Actions.GET_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.GET_PRODUCT_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_GET_PRODUCT:
            return getDefaultState();
        default:
            return state;
    }
}

export default getProduct;
