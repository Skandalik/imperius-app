import {client} from './index';

const url = '/jobs';

export function fetchJobs() {
    return dispatch => {
        return dispatch({
            type: 'FETCH_JOBS',
            payload: client.get(url)
        });
    };
}

export function fetchJob(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_JOB',
            payload: client.get(`${url}/${id}`)
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
            payload: client.get(`${url}/${job.id}/run`).then(function (response) {
                return dispatch(fetchJob(job.id))
            })
        });
    };
}

export function createJob(job) {
    return dispatch => {
        return dispatch({
            type: 'CREATE_JOB',
            payload: client.post(url, job)
        });
    };
}

export function updateJob(job) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_JOB',
            payload: client.put(`${url}/${job.id}`, job)
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
            payload: client.delete(`${url}/${job.id}`)
        });
    };
}