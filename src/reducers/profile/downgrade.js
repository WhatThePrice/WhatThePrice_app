import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function downgrade(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.DOWNGRADE:
            return {
                isLoading: true,
                error: null,
                data: {}
            };

        case Actions.DOWNGRADE_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.DOWNGRADE_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_DOWNGRADE:
            return getDefaultState();
        default:
            return state;
    }
}

export default downgrade;
