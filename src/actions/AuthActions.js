import {getClient} from './index';

const url = '/login_check';

export function login(user) {
    return dispatch => {
        return dispatch({
            type: 'LOGIN',
            payload: getClient().post(url, user)
        });
    };
}