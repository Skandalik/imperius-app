const defaultState = {
    scheduledBehaviors: [],
    scheduledBehavior: {},
    errors: {},
    loading: false,
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_SCHEDULED_BEHAVIORS_PENDING':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_SCHEDULED_BEHAVIORS_FULFILLED':
            return {
                ...state,
                loading: false,
                scheduledBehaviors: action.payload.data
            };
        case 'FETCH_SCHEDULED_BEHAVIOR_PENDING': {
            return {
                ...state,
                scheduledBehavior: {}
            };
        }
        case 'FETCH_SCHEDULED_BEHAVIOR_FULFILLED': {
            return {
                ...state,
                scheduledBehavior: action.payload.data,
                errors: {}
            };
        }
        case 'CREATE_SCHEDULED_BEHAVIOR_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'CREATE_SCHEDULED_BEHAVIOR_FULFILLED': {
            return {
                ...state,
                scheduledBehaviors: [...state.scheduledBehaviors, action.payload.data],
                errors: {},
                loading: false
            };
        }
        case 'UPDATE_SCHEDULED_BEHAVIOR_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'UPDATE_SCHEDULED_BEHAVIOR_FULFILLED': {
            const scheduledBehavior = action.payload.data;
            return {
                ...state,
                scheduledBehaviors: state.scheduledBehaviors.map(
                    item => (item.id === scheduledBehavior.id ? scheduledBehavior : item)
                ),
                errors: {},
                loading: false
            };
        }
        case 'DELETE_SCHEDULED_BEHAVIOR_PENDING': {
            let scheduledBehavior = action.meta.behaviorObject;
            return {
                ...state,
                scheduledBehaviors: state.scheduledBehaviors.map(
                    item => (item.id === scheduledBehavior.id ? scheduledBehavior : item)
                ),
            };
        }
        case 'DELETE_SCHEDULED_BEHAVIOR_FULFILLED': {
            const id = action.meta.behaviorObject.id
            return {
                ...state,
                loading: false,
                scheduledBehaviors: state.scheduledBehaviors.filter(item => item.id !== id)
            };
        }
        default:
            return state;
    }
}
;
