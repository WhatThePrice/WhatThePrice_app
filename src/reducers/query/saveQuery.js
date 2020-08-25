import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function saveQuery(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.SAVE_QUERY:
            return {
                isLoading: true,
                error: null,
                data: {}
            };
        case Actions.SAVE_QUERY_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.SAVE_QUERY_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_SAVE_QUERY:
            return getDefaultState();
        default:
            return state;
    }
}

export default saveQuery;
