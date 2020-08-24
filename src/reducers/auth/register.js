import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function register(state, action) {
    if (typeof state === "undefined") {
        return getDefaultState();
    }

    switch (action.type) {
        case Actions.REGISTER:
            return {
                isLoading: true,
                error: null,
                data: {}
            };

        case Actions.REGISTER_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case Actions.REGISTER_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {}
            };
        case Actions.RESET_REGISTER:
            return getDefaultState();
        default:
            return state;
    }
}

export default register;
