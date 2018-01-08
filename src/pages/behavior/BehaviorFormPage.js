import React from 'react';
import {Redirect} from 'react-router';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {createBehavior, fetchBehavior, updateBehavior} from '../../actions/BehaviorActions';
import BehaviorForm from "../../components/behavior/BehaviorForm";
import {fetchSensors} from "../../actions/SensorActions";

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
    }

    convertToBehavior(data) {
        let predicate = JSON.parse(data.predicateObject);
        let action = JSON.parse(data.actionObject);
        let behavior = {};

        behavior.sourceSensor = `/api/sensors/${this.state.sensorId}`;
        behavior.dependentSensor = data.dependentSensor;
        behavior.sourceProperty = predicate.property;
        behavior.predicate = predicate.predicate;
        if (data.predicateArgument === 'undefined') {
            behavior.predicateArgument = action.argument;
        } else {
            behavior.predicateArgument = data.predicateArgument
        }
        behavior.dependentProperty = action.property;
        behavior.action = action.action;
        if (data.actionArgument === 'undefined') {
            behavior.actionArgument = action.argument;
        } else {
            behavior.actionArgument = data.actionArgument
        }

        return behavior;
    }

    //todo polepsz
    submit = data => {
        let behavior = this.convertToBehavior(data);
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
                    <BehaviorForm
                        sensorId={this.state.sensorId}
                        behaviorId={this.state.behaviorId }
                        behavior={this.props.behavior}
                        loading={this.props.loading}
                        onSubmit={this.submit}
                        sensors={this.props.sensors}
                    />
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
        sensors: state.sensorStore.sensors
    };
}

export default connect(mapStateToProps, {createBehavior, updateBehavior, fetchBehavior, fetchSensors})(BehaviorFormPage);
