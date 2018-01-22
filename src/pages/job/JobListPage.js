import React from 'react';
import { connect } from 'react-redux';
import JobList from '../../components/job/JobList';
import {fetchJobs, stopJob, runJob} from '../../actions/JobActions';
import Link from 'react-router-dom/Link';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

class JobListPage extends React.Component {
    componentDidMount() {
        this.props.fetchJobs();
    }

    render() {
        return (
            <div>
                <h2>Check and manage jobs</h2>
                <br />
                <br />
                <JobList
                    jobs={this.props.jobs}
                    loading={this.props.loading}
                    runJob={this.props.runJob}
                    stopJob={this.props.stopJob}
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

export default connect(mapStateToProps, {runJob, fetchJobs, stopJob})(JobListPage);