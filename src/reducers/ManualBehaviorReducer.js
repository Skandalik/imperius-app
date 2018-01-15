const defaultState = {
    manualBehaviors: [],
    manualBehavior: {},
    errors: {},
    loading: false,
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_MANUAL_BEHAVIORS_PENDING':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_MANUAL_BEHAVIORS_FULFILLED':
            return {
                ...state,
                loading: false,
                manualBehaviors: action.payload.data
            };
        case 'FETCH_MANUAL_BEHAVIOR_PENDING': {
            return {
                ...state,
                manualBehavior: {}
            };
        }
        case 'FETCH_MANUAL_BEHAVIOR_FULFILLED': {
            return {
                ...state,
                manualBehavior: action.payload.data,
                errors: {}
            };
        }
        case 'CREATE_MANUAL_BEHAVIOR_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'CREATE_MANUAL_BEHAVIOR_FULFILLED': {
            return {
                ...state,
                manualBehaviors: [...state.manualBehaviors, action.payload.data],
                errors: {},
                loading: false
            };
        }
        case 'UPDATE_MANUAL_BEHAVIOR_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'UPDATE_MANUAL_BEHAVIOR_FULFILLED': {
            const manualBehavior = action.payload.data;
            return {
                ...state,
                manualBehaviors: state.manualBehaviors.map(
                    item => (item.id === manualBehavior.id ? manualBehavior : item)
                ),
                errors: {},
                loading: false
            };
        }
        case 'DELETE_MANUAL_BEHAVIOR_PENDING': {
            let manualBehavior = action.meta.behaviorObject;
            manualBehavior.loading = true;
            return {
                ...state,
                manualBehaviors: state.manualBehaviors.map(
                    item => (item.id === manualBehavior.id ? manualBehavior : item)
                ),
            };
        }
        case 'DELETE_MANUAL_BEHAVIOR_FULFILLED': {
            const id = action.meta.behaviorObject.id
            return {
                ...state,
                loading: false,
                manualBehaviors: state.manualBehaviors.filter(item => item.id !== id)
            };
        }
        default:
            return state;
    }
}
;
