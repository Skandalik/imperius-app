const defaultState = {
    behaviors: [],
    behavior: {},
    errors: {},
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
        case 'FETCH_BEHAVIOR_PENDING': {
            return {
                ...state,
                behavior: {}
            };
        }
        case 'FETCH_BEHAVIOR_FULFILLED': {
            return {
                ...state,
                behavior: action.payload.data,
                errors: {}
            };
        }
        case 'CREATE_BEHAVIOR_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'CREATE_BEHAVIOR_FULFILLED': {
            return {
                ...state,
                behaviors: [...state.behaviors, action.payload.data],
                errors: {},
                loading: false
            };
        }
        case 'UPDATE_BEHAVIOR_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'UPDATE_BEHAVIOR_FULFILLED': {
            const behavior = action.payload.data;
            return {
                ...state,
                behaviors: state.behaviors.map(
                    item => (item.id === behavior.id ? behavior : item)
                ),
                errors: {},
                loading: false
            };
        }
        case 'DELETE_BEHAVIOR_PENDING': {
            let behavior = action.meta.behaviorObject
            behavior.loading = true
            return {
                ...state,
                behaviors: state.behaviors.map(
                    item => (item.id === behavior.id ? behavior : item)
                ),
            };
        }
        case 'DELETE_BEHAVIOR_FULFILLED': {
            const id = action.meta.behaviorObject.id
            return {
                ...state,
                loading: false,
                behaviors: state.behaviors.filter(item => item.id !== id)
            };
        }
        default:
            return state;
    }
}
;
