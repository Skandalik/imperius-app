import {getClient} from './index';
import {SensorStateChangeEnumChoices} from "../components/behavior/BehaviorEnum";

const url = '/sensors';

export function refetchSensors() {
    return dispatch => {
        return dispatch({
            type: 'REFETCH_SENSORS',
            payload: getClient().get(url)
        });
    };
}

export function fetchSensors() {
    return dispatch => {
        return dispatch({
            type: 'FETCH_SENSORS',
            payload: getClient().get(url)
        });
    };
}

export function checkStatusSensor(sensor) {
    return dispatch => {
        return dispatch({
            type: 'CHECK_STATUS',
            meta: {
                sensorObject: sensor
            },
            payload: getClient().get(`${url}/${sensor.id}/status/check`).then(function (response) {
                return dispatch(fetchSensor(sensor.id))
            })
        });
    };
}

export function setStatusSensor(sensor, status) {
    return dispatch => {
        return dispatch({
            type: 'SET_STATUS',
            meta: {
                sensorObject: sensor
            },
            payload: getClient().put(`${url}/${sensor.id}/status/set/${status}`)
        });
    };
}

export function setStateSensor(sensor, state) {
    return dispatch => {
        return dispatch({
            type: 'SET_STATUS',
            meta: {
                sensorObject: sensor
            },
            payload: getClient().put(`${url}/${sensor.id}/set/${SensorStateChangeEnumChoices[state]}`)
        });
    };
}


export function fetchSensor(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_SENSOR',
            payload: getClient().get(`${url}/${id}`)
        });
    };
}

export function updateSensor(sensor) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_SENSOR',
            payload: getClient().put(`${url}/${sensor.id}`, sensor)
        });
    };
}

export function deleteSensor(sensor) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_SENSOR',
            meta: {
                sensorObject: sensor
            },
            payload: getClient().delete(`${url}/${sensor.id}`)
        });
    };
}

