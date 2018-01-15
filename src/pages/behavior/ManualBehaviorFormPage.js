import React from 'react';
import {Redirect} from 'react-router';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {fetchSensor, fetchSensors} from "../../actions/SensorActions";
import {Dimmer, Loader, Segment} from "semantic-ui-react";
import {BehaviorConstants} from "../../components/behavior/BehaviorEnum";
import {createManualBehavior, fetchManualBehavior, updateManualBehavior} from "../../actions/ManualBehaviorActions";
import ManualBehaviorForm from "../../components/behavior/ManualBehaviorForm";

class ManualBehaviorFormPage extends React.Component {
    state = {
        redirect: false,
        sensorId: this.props.match.params.id,
        behaviorId: this.props.match.params.behaviorId
    };

    componentDidMount() {
        const id = this.props.match.params.behaviorId;
        if (id) {
            this.props.fetchManualBehavior(id);
        }
        this.props.fetchSensors();
        this.props.fetchSensor(this.state.sensorId);
    }

    prepareBehavior (behavior){
        behavior.sensor = `/api/sensors/${this.state.sensorId}`;
        behavior.actionSensor = `/api/sensors/${behavior.actionSensor.id}`;

        return behavior;
    };

    //todo polepsz
    submit = behavior => {

        behavior = this.prepareBehavior(behavior);

        if (!behavior.id) {
            return this.props
                .createManualBehavior(behavior)
                .then(response => {
                    this.setState({redirect: true});
                })
                .catch(err => {
                    throw new SubmissionError(this.props.errors);
                });
        } else {
            return this.props
                .updateManualBehavior(behavior)
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
                        <h1 style={{marginTop: '1em'}}> {this.state.behaviorId ? 'Edit manual behavior' : 'Add new manual behavior'}</h1>
                        <ManualBehaviorForm
                            sensorId={this.state.sensorId}
                            behaviorId={this.state.behaviorId}
                            behavior={this.props.manualBehavior}
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
        manualBehavior: state.manualBehaviorStore.manualBehavior,
        errors: state.manualBehaviorStore.errors,
        loading: state.manualBehaviorStore.loading,
        sensorLoading: state.sensorStore.loading,
        sensors: state.sensorStore.sensors,
    };
}

export default connect(mapStateToProps, {
    createManualBehavior,
    updateManualBehavior,
    fetchManualBehavior,
    fetchSensors,
    fetchSensor,
})(ManualBehaviorFormPage);
