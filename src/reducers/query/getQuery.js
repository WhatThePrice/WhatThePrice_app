import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function getQuery(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.GET_QUERY:
            return {
                isLoading: true,
                error: null,
                data: {}
            };
        case Actions.GET_QUERY_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.GET_QUERY_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_GET_QUERY:
            return getDefaultState();
        default:
            return state;
    }
}

export default getQuery;
