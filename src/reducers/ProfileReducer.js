const defaultState = {
    loading: false,
    profile: {},
    errors: null
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD_PENDING': {
            return {
                ...state,
                loading: true,
            };
        }
        case 'CHANGE_PASSWORD_FULFILLED': {
            return {
                ...state,
                loading: false,
            };
        }
        case 'CHANGE_PASSWORD_REJECTED': {
            return {
                ...state,
                loading: false,
                authenticated: false,
                errors: action.payload.response.data
            };
        }
        case 'FETCH_PROFILE_PENDING': {
            return {
                ...state,
                profile: {}
            };
        }
        case 'FETCH_PROFILE_FULFILLED': {
            return {
                ...state,
                profile: action.payload.data,
                errors: {}
            };
        }
        default:
            return state;
    }
};
