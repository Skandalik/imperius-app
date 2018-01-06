export function setValue(value, sensor) {
    return dispatch => {
        sensor.status = value;
        return dispatch({
            type: 'SET_VALUE',
            payload: sensor,
        });
    };
}