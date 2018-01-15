import {client} from './index';

const sensor_behaviors_url = '/sensors';
const url = '/scheduled_behaviors';

export function fetchScheduledBehaviors(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_SCHEDULED_BEHAVIORS',
            payload: client.get(`${sensor_behaviors_url}/${id}/scheduled_behaviors`)
        });
    };
}

export function fetchScheduledBehavior(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_SCHEDULED_BEHAVIOR',
            payload: client.get(`${url}/${id}`)
        });
    };
}

export function createScheduledBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'CREATE_SCHEDULED_BEHAVIOR',
            payload: client.post(url, behavior)
        });
    };
}

export function updateScheduledBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_SCHEDULED_BEHAVIOR',
            payload: client.put(`${url}/${behavior.id}`, behavior)
        });
    };
}

export function deleteScheduledBehavior(behavior) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_SCHEDULED_BEHAVIOR',
            meta: {
                behaviorObject: behavior
            },
            payload: client.delete(`${url}/${behavior.id}`)
        });
    };
}