import React from 'react';
import {Button, Dimmer, Form, Grid, Label, Segment} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {
    ActionOptions, BehaviorActions, BehaviorConstants, BehaviorPredicates, BehaviorProperties,
    PredicatesOptions, BehaviorArgumentsActive, BehaviorActionTurn, BehaviorActionSet
} from "./BehaviorEnum";
import {fetchSensor} from "../../actions/SensorActions";
import Loader from "semantic-ui-react/dist/es/elements/Loader/Loader";

class BehaviorForm extends React.Component {
    state = {
        predicateHidden: true,
        predicateValue: 1,
        actionHidden: true,
        actionValue: 1,
    };

    renderField = ({input, label, type, value, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <input {...input} placeholder={label} value={value} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    componentWillReceiveProps = (nextProps) => {
        const {behavior} = nextProps;

        if (behavior.id !== this.props.behavior.id) {
            this.props.initialize(behavior);
        }
    };

    options = (options) => {
        return options.map((value, index) => {
                return (
                    <option key={index} value={value}>{value}</option>
                );
            }
        );
    };

    sensors = () => {
        return this.props.sensors.map((sensor) => {
                if (parseInt(sensor.id) === parseInt(this.props.sensorId)) {
                    return;
                }
                const sensorIri = '/api/sensors/' + sensor.id;
                return (
                    <option key={sensor.id} value={sensorIri}>{sensor.name ? sensor.name : sensor.uuid}</option>
                );

            }
        );
    };

    onSourcePropertyChange = (e) => {
        let value = e.currentTarget.value;
        let hidden = true;

        if (value === BehaviorConstants.STATUS) {
            hidden = false;
        }

        this.setState({
            predicateHidden: hidden
        })
    };

    onDependentPropertyChange = (e) => {
        let value = e.currentTarget.value;
        let hidden = true;

        if (value === BehaviorConstants.STATUS) {
            hidden = false;
        }

        this.setState({
            actionHidden: hidden
        })
    };

    onPredicateChange = (e) => {
        let value = e.currentTarget.value;

        if (this.state.predicateHidden) {
            let predicateValue = 1;
            if (value === BehaviorConstants.OFF) {
                predicateValue = 0;
            }

            this.setState({
                predicateValue: predicateValue
            })
        }
    };

    onActionChange = (e) => {
        let value = e.currentTarget.value;

        if (this.state.actionHidden) {
            let actionValue = 1;
            if (value === BehaviorConstants.OFF) {
                actionValue = 0;
            }

            this.setState({
                actionValue: actionValue
            })
        }
    };

    properties = (properties: array) => {
        return properties.map((value, index) => {
                return (
                    <option key={index} value={value.property}>{value.description}</option>
                );
            }
        );
    };

    render() {
        const {handleSubmit, pristine, submitting, loading, behaviorId, sensorId, behavior} = this.props;
        const padding = {padding: 50};
        return (
            <div>
                <h1 style={{marginTop: '1em'}}> {behaviorId ? 'Edit behavior' : 'Add new behavior'}</h1>
                <Segment>
                    <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                        <Segment.Group horizontal>
                            <Segment>
                                <Label size={'huge'} color={'blue'}>IF</Label>
                                <Label size={'huge'}> THIS SENSOR</Label>
                            </Segment>
                            <Segment>
                                <Field type={'select'} component={'select'} name="sourceProperty" className="ui dropdown" onChange={this.onSourcePropertyChange}>
                                    <option>- Choose property -</option>
                                    {this.properties(BehaviorProperties)}
                                </Field>
                            </Segment>
                            <Segment>
                                <Field type={'select'} component={'select'} name="predicate" className="ui dropdown" onChange={this.onPredicateChange}>
                                    <option>- Choose condition -</option>
                                    {this.state.predicateHidden ?
                                        this.properties(BehaviorArgumentsActive) :
                                        this.options(BehaviorPredicates)}
                                </Field>
                            </Segment>
                            <Segment hidden={this.state.predicateHidden}>
                                <Field
                                    component={'input'}
                                    name="predicateArgument"
                                    type="text"
                                    defaultValue={
                                        this.state.predicateHidden ? this.state.predicateValue : ''
                                    }
                                />
                            </Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>
                                <Label size={'huge'} color={'blue'}>THEN</Label>
                            </Segment>
                            <Segment>
                                <Field type={'select'} component={'select'} name="dependentSensor" className="ui dropdown">
                                    <option>- Choose sensor -</option>
                                    {this.sensors()}
                                </Field>
                            </Segment>
                            <Segment>
                                <Field type={'select'} component={'select'} name="dependentProperty" className="ui dropdown" onChange={this.onDependentPropertyChange}>
                                    <option>- Choose property -</option>
                                    {this.properties(BehaviorProperties)}
                                </Field>
                            </Segment>
                            <Segment>
                                <Field type={'select'} component={'select'} name="action" className="ui dropdown" onChange={this.onActionChange}>
                                    <option>- Choose action -</option>
                                    {this.state.actionHidden ?
                                        this.properties(BehaviorActionTurn) :
                                        this.options(BehaviorActionSet)}
                                </Field>
                            </Segment>
                            <Segment hidden={this.state.actionHidden}>
                                <Field
                                    component={'input'}
                                    name="actionArgument"
                                    type="text"
                                    value={
                                        this.state.actionHidden ? this.state.actionValue : ''
                                    }
                                />
                            </Segment>
                        </Segment.Group>
                        <br/>
                        <Button primary content={'Save'} type="submit" disabled={pristine || submitting}/>
                        <Button as={Link} to={`/sensor/${sensorId}/behaviors`} icon={'arrow left'}
                                content={'Go back'}/>
                    </Form>
                </Segment>
            </div>
        );
    }
}

const
    validate = values => {
        const errors = {};
        return errors;
    };

export default reduxForm({form: 'behavior', validate})

(
    BehaviorForm
)
;
