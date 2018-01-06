import {client} from './index';

const url = '/sensors';

export function fetchBehaviors(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_BEHAVIORS',
            payload: client.get(`${url}/${id}/behaviors`)
        });
    };
}

