import {getClient} from './index';

const sensor_behaviors_url = '/sensors';
const url = '/manual_behaviors';

export function fetchManualBehaviors(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_MANUAL_BEHAVIORS',
            payload: getClient().get(`${sensor_behaviors_url}/${id}/manual_behaviors`)
        });
    };
}

export function fetchManualBehavior(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_MANUAL_BEHAVIOR',
            payload: getClient().get(`${url}/${id}`)
        });
    };
}

export function createManualBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'CREATE_MANUAL_BEHAVIOR',
            payload: getClient().post(url, behavior)
        });
    };
}

export function updateManualBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_MANUAL_BEHAVIOR',
            payload: getClient().put(`${url}/${behavior.id}`, behavior)
        });
    };
}

export function deleteManualBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_MANUAL_BEHAVIOR',
            meta: {
                behaviorObject: behavior
            },
            payload: getClient().delete(`${url}/${behavior.id}`)
        });
    };
}