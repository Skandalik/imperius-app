import React from 'react';
import {Redirect} from 'react-router';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {fetchSensor, fetchSensors} from "../../actions/SensorActions";
import {Dimmer, Loader, Segment} from "semantic-ui-react";
import {BehaviorConstants} from "../../components/behavior/BehaviorEnum";
import {createScheduledBehavior, fetchScheduledBehavior, updateScheduledBehavior} from "../../actions/ScheduledBehaviorActions";
import ScheduledBehaviorForm from "../../components/behavior/ScheduledBehaviorForm";

class ScheduledBehaviorFormPage extends React.Component {
    state = {
        redirect: false,
        sensorId: this.props.match.params.id,
        behaviorId: this.props.match.params.behaviorId
    };

    componentDidMount() {
        const id = this.props.match.params.behaviorId;
        if (id) {
            this.props.fetchScheduledBehavior(id);
        }
        this.props.fetchSensors();
        this.props.fetchSensor(this.state.sensorId);
    }

    prepareBehavior (behavior){
        behavior.sensor = `/api/sensors/${this.state.sensorId}`;

        return behavior;
    };

    //todo polepsz
    submit = behavior => {

        behavior = this.prepareBehavior(behavior);

        if (!behavior.id) {
            return this.props
                .createScheduledBehavior(behavior)
                .then(response => {
                    this.setState({redirect: true});
                })
                .catch(err => {
                    throw new SubmissionError(this.props.errors);
                });
        } else {
            return this.props
                .updateScheduledBehavior(behavior)
                .then(response => {
                    this.setState({redirect: true});
                })
                .catch(err => {
                    throw new SubmissionError(this.props.errors);
                });
        }
    };

    render() {
        return (
            <div>
                {this.state.redirect ? (
                    <Redirect to={`/sensor/${this.state.sensorId}/behaviors`}/>
                ) : (
                    <div>
                        <h1 style={{marginTop: '1em'}}> {this.state.behaviorId ? 'Edit scheduled behavior' : 'Add new scheduled behavior'}</h1>
                        <ScheduledBehaviorForm
                            sensorId={this.state.sensorId}
                            behaviorId={this.state.behaviorId}
                            behavior={this.props.scheduledBehavior}
                            loading={this.props.loading}
                            onSubmit={this.submit}
                            sensors={this.props.sensors}
                            sensor={this.props.sensor}
                        />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        scheduledBehavior: state.scheduledBehaviorStore.scheduledBehavior,
        errors: state.scheduledBehaviorStore.errors,
        loading: state.scheduledBehaviorStore.loading,
        sensorLoading: state.sensorStore.loading,
        sensors: state.sensorStore.sensors,
    };
}

export default connect(mapStateToProps, {
    createScheduledBehavior,
    updateScheduledBehavior,
    fetchScheduledBehavior,
    fetchSensors,
    fetchSensor,
})(ScheduledBehaviorFormPage);
