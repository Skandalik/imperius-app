import React from 'react';
import {Redirect} from 'react-router';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {updateJob, fetchJob} from "../../actions/JobActions";
import JobForm from "../../components/job/JobForm";


class JobFormPage extends React.Component {
    state = {
        redirect: false,
        jobId: this.props.match.params.id,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchJob(id);
        }
    }

    static createAdditionalData(job) {
        let additionalData = {
            interval: job.additionalData
        };
        job.additionalData = JSON.stringify(additionalData);

        return job;
    }

    submit = job => {
        JobFormPage.createAdditionalData(job);
        return this.props
            .updateJob(job)
            .then(response => {
                this.setState({redirect: true});
            })
            .catch(err => {
                throw new SubmissionError(this.props.errors);
            });
    };

    render() {
        return (
            <div>
                {this.state.redirect ? (
                    <Redirect to={'/job'}/>
                ) : (
                    <JobForm
                        jobId={this.state.jobId}
                        job={this.props.job}
                        loading={this.props.loading}
                        onSubmit={this.submit}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        job: state.jobStore.job,
        errors: state.jobStore.errors,
        loading: state.jobStore.loading
    };
}

export default connect(mapStateToProps, {updateJob, fetchJob})(JobFormPage);
