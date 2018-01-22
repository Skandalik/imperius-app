import {getClient} from './index';

const url = '/profile';

export function changePassword(user) {
    return dispatch => {
        return dispatch({
            type: 'CHANGE_PASSWORD',
            payload: getClient().put(url, user)
        });
    };
}

export function fetchProfile() {
    return dispatch => {
        return dispatch({
            type: 'FETCH_PROFILE',
            payload: getClient().get(url)
        });
    };
}