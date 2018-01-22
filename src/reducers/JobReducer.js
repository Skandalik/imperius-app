const defaultState = {
    jobs: [],
    job: {},
    loading: false,
    errors: {}
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_JOBS_PENDING': {
            return {
                ...state,
                loading: true,
                jobs: state.jobs
            };
        }
        case 'FETCH_JOBS_FULFILLED': {
            return {
                ...state,
                loading: false,
                jobs: action.payload.data
            };
        }
        case 'FETCH_JOB_PENDING': {
            return {
                ...state,
                job: {}
            };
        }
        case 'FETCH_JOB_FULFILLED': {
            return {
                ...state,
                job: action.payload.data,
                errors: {}
            };
        }
        case 'CREATE_JOB_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'CREATE_JOB_FULFILLED': {
            return {
                ...state,
                jobs: [...state.jobs, action.payload.data],
                errors: {},
                loading: false
            };
        }
        case 'UPDATE_JOB_PENDING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'UPDATE_JOB_FULFILLED': {
            const job = action.payload.data;
            return {
                ...state,
                jobs: state.jobs.map(
                    item => (item.id === job.id ? job : item)
                ),
                errors: {},
                loading: false
            };
        }
        case 'DELETE_JOB_PENDING': {
            let job = action.meta.jobObject
            job.loading = true
            return {
                ...state,
                jobs: state.jobs.map(
                    item => (item.id === job.id ? job : item)
                ),
            };
        }
        case 'DELETE_JOB_FULFILLED': {
            const id = action.meta.jobObject.id
            return {
                ...state,
                loading: false,
                jobs: state.jobs.filter(item => item.id !== id)
            };
        }
        case 'RUN_JOB_PENDING': {
            let job = action.meta.jobObject
            job.loading = true
            return {
                ...state,
                jobs: state.jobs.map(
                    item => (item.id === job.id ? job: item)
                )
            };
        }
        case 'RUN_JOB_FULFILLED': {
            let job = action.payload.action.payload.data
            job.loading = false
            return {
                ...state,
                jobs: state.jobs.map(
                    item => (item.id === job.id ? job : item)
                ),
            };
        }
        case 'STOP_JOB_PENDING': {
            let job = action.meta.jobObject
            job.loading = true
            return {
                ...state,
                jobs: state.jobs.map(
                    item => (item.id === job.id ? job: item)
                )
            };
        }
        case 'STOP_JOB_FULFILLED': {
            let job = action.payload.action.payload.data
            job.loading = false
            return {
                ...state,
                jobs: state.jobs.map(
                    item => (item.id === job.id ? job : item)
                ),
            };
        }
        default:
            return state;
    }
};
