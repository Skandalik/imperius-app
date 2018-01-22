import {getClient} from './index';

const url = '/rooms';

export function fetchRooms() {
    return dispatch => {
        return dispatch({
            type: 'FETCH_ROOMS',
            payload: getClient().get(url)
        });
    };
}

export function fetchRoom(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_ROOM',
            payload: getClient().get(`${url}/${id}`)
        });
    };
}

export function createRoom(room) {
    return dispatch => {
        return dispatch({
            type: 'CREATE_ROOM',
            payload: getClient().post(url, room)
        });
    };
}

export function updateRoom(room) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_ROOM',
            payload: getClient().put(`${url}/${room.id}`, room)
        });
    };
}

export function deleteRoom(room) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_ROOM',
            meta: {
                roomObject: room
            },
            payload: getClient().delete(`${url}/${room.id}`)
        });
    };
}