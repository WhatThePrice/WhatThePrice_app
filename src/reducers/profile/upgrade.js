import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function upgrade(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.UPGRADE:
            return {
                isLoading: true,
                error: null,
                data: {}
            };

        case Actions.UPGRADE_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.UPGRADE_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_UPGRADE:
            return getDefaultState();
        default:
            return state;
    }
}

export default upgrade;
