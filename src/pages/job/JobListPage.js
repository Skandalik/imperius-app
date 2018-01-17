import React from 'react';
import { connect } from 'react-redux';
import JobList from '../../components/job/JobList';
import {fetchJobs, deleteJob, runJob} from '../../actions/JobActions';
import Link from 'react-router-dom/Link';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

class JobListPage extends React.Component {
    componentDidMount() {
        this.props.fetchJobs();
    }

    render() {
        return (
            <div>
                <h2>Manage your jobs</h2>
                <Link to={'/job/create'} className='primary ui button'><Icon className='plus'/>Add new Job </Link>
                <br />
                <br />
                <JobList
                    jobs={this.props.jobs}
                    loading={this.props.loading}
                    deleteJob={this.props.deleteJob}
                    runJob={this.props.runJob}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.jobStore.jobs,
        loading: state.jobStore.loading
    };
}

export default connect(mapStateToProps, {runJob, fetchJobs, deleteJob })(JobListPage);