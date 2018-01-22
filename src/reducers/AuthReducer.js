const defaultState = {
    loading: false,
    authenticated: !(localStorage.getItem('token') === null),
    token: {},
    errors: null
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'LOGIN_PENDING': {
            return {
                ...state,
                loading: true,
                authenticated: false,
            };
        }
        case 'LOGIN_FULFILLED': {
            return {
                ...state,
                loading: false,
                authenticated: true,
                token: action.payload.data.token
            };
        }
        case 'LOGIN_REJECTED': {
            return {
                ...state,
                loading: false,
                authenticated: false,
                errors: action.payload.response.data
            };
        }
        case 'CHECK_AUTH_REJECTED': {
            return {
                ...state,
                loading: false,
                authenticated: false,
                errors: action.payload.response.data
            };
        }
        default:
            return state;
    }
};
