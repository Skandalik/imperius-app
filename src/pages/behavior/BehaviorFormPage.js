import React from 'react';
import {Redirect} from 'react-router';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {createBehavior, fetchBehavior, updateBehavior} from '../../actions/BehaviorActions';
import BehaviorForm from "../../components/behavior/BehaviorForm";
import {fetchSensor, fetchSensors} from "../../actions/SensorActions";
import {Dimmer, Loader, Segment} from "semantic-ui-react";
import {BehaviorConstants} from "../../components/behavior/BehaviorEnum";

class BehaviorFormPage extends React.Component {
    state = {
        redirect: false,
        sensorId: this.props.match.params.id,
        behaviorId: this.props.match.params.behaviorId
    };

    componentDidMount() {
        const id = this.props.match.params.behaviorId;
        console.log(id);
        if (id) {
            this.props.fetchBehavior(id);
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
                .createBehavior(behavior)
                .then(response => {
                    this.setState({redirect: true});
                })
                .catch(err => {
                    throw new SubmissionError(this.props.errors);
                });
        } else {
            return this.props
                .updateBehavior(behavior)
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
                        <h1 style={{marginTop: '1em'}}> {this.state.behaviorId ? 'Edit behavior' : 'Add new behavior'}</h1>
                        <BehaviorForm
                            sensorId={this.state.sensorId}
                            behaviorId={this.state.behaviorId}
                            behavior={this.props.behavior}
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
        behavior: state.behaviorStore.behavior,
        errors: state.behaviorStore.errors,
        loading: state.behaviorStore.loading,
        sensorLoading: state.sensorStore.loading,
        sensors: state.sensorStore.sensors,
    };
}

export default connect(mapStateToProps, {
    createBehavior,
    updateBehavior,
    fetchBehavior,
    fetchSensors,
    fetchSensor,
})(BehaviorFormPage);
