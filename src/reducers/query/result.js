import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function result(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.RESULT:
            return {
                isLoading: true,
                error: null,
                data: {}
            };
        case Actions.RESULT_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.RESULT_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_RESULT:
            return getDefaultState();
        default:
            return state;
    }
}

export default result;
