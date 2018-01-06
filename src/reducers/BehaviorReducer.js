const defaultState = {
    behaviors: [],
    loading: false,
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_BEHAVIORS_PENDING':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_BEHAVIORS_FULFILLED':
            return {
                ...state,
                loading: false,
                behaviors: action.payload.data
            };
        default:
            return state;
    }
};
