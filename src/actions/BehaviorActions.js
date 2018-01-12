import {client} from './index';

const sensor_behaviors_url = '/sensors';
const url = '/manual_behaviors';

export function fetchBehaviors(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_BEHAVIORS',
            payload: client.get(`${sensor_behaviors_url}/${id}/manual_behaviors`)
        });
    };
}

export function fetchBehavior(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_BEHAVIOR',
            payload: client.get(`${url}/${id}`)
        });
    };
}

export function createBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'CREATE_BEHAVIOR',
            payload: client.post(url, behavior)
        });
    };
}

export function updateBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_BEHAVIOR',
            payload: client.put(`${url}/${behavior.id}`, behavior)
        });
    };
}

export function deleteBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_BEHAVIOR',
            meta: {
                roomObject: behavior
            },
            payload: client.delete(`${url}/${behavior.id}`)
        });
    };
}