import {getClient} from './index';

const url = '/jobs';

export function fetchJobs() {
    return dispatch => {
        return dispatch({
            type: 'FETCH_JOBS',
            payload: getClient().get(url)
        });
    };
}

export function fetchJob(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_JOB',
            payload: getClient().get(`${url}/${id}`)
        });
    };
}

export function runJob(job) {
    return dispatch => {
        return dispatch({
            type: 'RUN_JOB',
            meta: {
                jobObject: job
            },
            payload: getClient().get(`${url}/${job.id}/run`).then(function (response) {
                return dispatch(fetchJob(job.id))
            })
        });
    };
}

export function stopJob(job) {
    return dispatch => {
        return dispatch({
            type: 'STOP_JOB',
            meta: {
                jobObject: job
            },
            payload: getClient().get(`${url}/${job.id}/stop`).then(function (response) {
                return dispatch(fetchJob(job.id))
            })
        });
    };
}

export function createJob(job) {
    return dispatch => {
        return dispatch({
            type: 'CREATE_JOB',
            payload: getClient().post(url, job)
        });
    };
}

export function updateJob(job) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_JOB',
            payload: getClient().put(`${url}/${job.id}`, job)
        });
    };
}

export function deleteJob(job) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_JOB',
            meta: {
                jobObject: job
            },
            payload: getClient().delete(`${url}/${job.id}`)
        });
    };
}