import React from 'react';
import {connect} from 'react-redux';
import JobList from '../../components/job/JobList';
import {fetchJobs, stopJob, runJob, isJobRunning, refetchJobs} from '../../actions/JobActions';
import Link from 'react-router-dom/Link';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import {ReactInterval} from "react-interval";

class JobListPage extends React.Component {
    state = {
        changeIntervalHidden: true
    };

    componentDidMount() {
        this.props.fetchJobs();
    }

    showHideInterval() {
        this.state.changeIntervalHidden = false;
    }

    render() {
        return (
            <div>
                <ReactInterval
                    timeout={5000}
                    enabled={true}
                    callback={() => this.props.refetchJobs()}
                />
                <h2>Check and manage jobs</h2>
                <br/>
                <br/>
                <JobList
                    jobs={this.props.jobs}
                    loading={this.props.loading}
                    runJob={this.props.runJob}
                    stopJob={this.props.stopJob}
                    changeIntervalHidden={this.state.changeIntervalHidden}
                    showHideInterval={this.showHideInterval}
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

export default connect(mapStateToProps, {fetchJobs, runJob, refetchJobs, stopJob})(JobListPage);