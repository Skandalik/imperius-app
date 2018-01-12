import React from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import Link from "react-router-dom/es/Link";
import {
    BehaviorActionsEnum,
    BehaviorActionsEnumChoices,
    BehaviorConditionsEnumChoices, BehaviorConditionsSwitchableEnumChoices, BehaviorCondititionsFetchableEnumChoices,
    BehaviorFetchableSwitchableConditions
} from "./BehaviorEnum";

class BehaviorForm extends React.Component {
    state = {
        sourceInputHidden: true,
        dependentInputHidden: true,
    };
    renderField = ({input, hidden, label, type, meta: {touched, error}}) => (
        <Form.Field hidden={hidden} disabled={hidden} className={classnames({error: touched && error})}>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    componentWillReceiveProps = (nextProps) => {
        const {behavior} = nextProps;

        if (behavior.id !== this.props.behavior.id) {
            this.props.initialize(behavior);
        }
    };

    getBehaviorOptions = (Enum) => {
        return Object.keys(Enum).map((key, index) => {
            return (
                <option key={index} value={key}>{Enum[key]}</option>
            )
        });
    };

    sensors = () => {
        return this.props.sensors.map((sensor) => {
                if (parseInt(sensor.id) === parseInt(this.props.sensorId)) {
                    return;
                }
                return (
                    <option key={sensor.id} value={sensor.id}>{sensor.id} - {sensor.name ? sensor.name : sensor.uuid}</option>
                );

            }
        );
    };

    onSourceStatusChange(event) {
        let value = event.target.value;
        if (value !== BehaviorFetchableSwitchableConditions.IS_OFF && value !== BehaviorFetchableSwitchableConditions.IS_ON) {
            this.setState({
                sourceInputHidden: false
            });
            return;
        }

        this.setState({
            sourceInputHidden: true
        })
    };

    onDependentStatusChange(event) {
        let value = event.target.value;
        if (value === BehaviorActionsEnum.SET) {
            this.setState({
                dependentInputHidden: false
            });
            return;
        }

        this.setState({
            dependentInputHidden: true
        })
    };

    getOptionsBasedOnProperty(sensor) {
        if (sensor.fetchable) {
            return this.getBehaviorOptions(BehaviorCondititionsFetchableEnumChoices);
        }
        return this.getBehaviorOptions(BehaviorConditionsSwitchableEnumChoices);
    }

    render() {
        const parse = value => value === undefined ? undefined : parseInt(value, 10);
        const {handleSubmit, pristine, submitting, loading, behavior, behaviorId, sensorId} = this.props;
        const padding = {padding: 50};
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Segment>
                        <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                            <h1>IF THIS SENSOR</h1>
                            <div>
                                <Field name={'requirement'} type={'select'} component={'select'}
                                       className={'ui dropdown'} onChange={(event) => this.onSourceStatusChange(event)}>
                                    <option>- Choose condition -</option>
                                    {this.getBehaviorOptions(BehaviorConditionsEnumChoices)}
                                </Field>
                                <Field
                                    parse={parse}
                                    hidden={this.state.sourceInputHidden}
                                    name={'requirementArgument'}
                                    type={'number'}
                                    component={this.renderField}
                                    label={'Value for status condition'}
                                />
                            </div>
                            <h1>THEN SENSOR</h1>
                            <div>
                                <Field name={'actionSensor.id'} type={'select'} component={'select'}
                                       className={'ui dropdown'}>
                                    <option>- Choose sensor -</option>
                                    {this.sensors()}
                                </Field>
                                <Field name={'action'} type={'select'} component={'select'}
                                       className={'ui dropdown'}
                                       onChange={(event) => this.onDependentStatusChange(event)}>
                                    <option>- Choose condition -</option>
                                    {this.getBehaviorOptions(BehaviorActionsEnumChoices)}
                                </Field>
                                <Field
                                    parse={parse}
                                    hidden={this.state.dependentInputHidden}
                                    name={'actionArgument'}
                                    type={'number'}
                                    component={this.renderField}
                                    label={'Set status to this value'}
                                />
                            </div>
                            <br/>
                            <Button primary content={'Save'} type="submit" disabled={pristine || submitting}/>
                            <Button as={Link} to={`/sensor/${sensorId}/manual_behaviors`} icon={'arrow left'}
                                    content={'Go back'}/>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
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